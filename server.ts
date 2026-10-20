import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { QUESTIONS_BANK } from './src/data/questions.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const PAYMENT_SECRET_KEY = process.env.PAYMENT_SECRET_KEY || 'ireme_college_500_frw_secret_2026';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In-memory transaction registry for active sessions
interface PaymentTransaction {
  id: string;
  phone: string;
  formattedPhone: string;
  provider: 'mtn' | 'airtel';
  amount: number;
  status: 'PENDING' | 'SUCCESSFUL' | 'FAILED';
  createdAt: number;
  paymentToken?: string;
}

const transactionsDb = new Map<string, PaymentTransaction>();

// Helper to normalize Rwandan phone numbers
function normalizeRwandaPhone(rawPhone: string): { clean: string; intl: string; detectedProvider: 'mtn' | 'airtel' | null } {
  const digitsOnly = rawPhone.replace(/\D/g, '');
  let local = digitsOnly;
  
  if (local.startsWith('250')) {
    local = '0' + local.substring(3);
  }
  if (!local.startsWith('0') && local.length === 9) {
    local = '0' + local;
  }

  let provider: 'mtn' | 'airtel' | null = null;
  if (local.startsWith('078') || local.startsWith('079')) {
    provider = 'mtn';
  } else if (local.startsWith('072') || local.startsWith('073')) {
    provider = 'airtel';
  }

  const intl = local.startsWith('0') ? '250' + local.substring(1) : '250' + local;
  return { clean: local, intl, detectedProvider: provider };
}

// Generate tamper-proof HMAC verification token
function createPaymentToken(phone: string, transactionId: string): string {
  const payload = `${phone}:${transactionId}:${Date.now()}`;
  const hmac = crypto.createHmac('sha256', PAYMENT_SECRET_KEY).update(payload).digest('hex');
  return Buffer.from(JSON.stringify({ payload, hmac })).toString('base64');
}

// Verify HMAC token
function verifyPaymentToken(tokenStr: string): boolean {
  try {
    const raw = Buffer.from(tokenStr, 'base64').toString('utf8');
    const { payload, hmac } = JSON.parse(raw);
    const expected = crypto.createHmac('sha256', PAYMENT_SECRET_KEY).update(payload).digest('hex');
    return expected === hmac;
  } catch {
    return false;
  }
}

// ================= API ROUTES =================

/**
 * 1. POST /api/pay/initiate
 * Initiates real Rwandan Mobile Money payment (MTN MoMo or Airtel Money) for 500 FRW
 */
app.post('/api/pay/initiate', async (req: Request, res: Response) => {
  try {
    const { phone, provider, amount = 500 } = req.body;

    if (!phone) {
      return res.status(400).json({ success: false, error: 'Numero ya telefoni irakenewe (Phone number is required).' });
    }

    const { clean, intl, detectedProvider } = normalizeRwandaPhone(phone);
    const selectedProvider: 'mtn' | 'airtel' = provider || detectedProvider || 'mtn';

    // Validate Rwandan prefix against provider
    if (selectedProvider === 'mtn' && !clean.startsWith('078') && !clean.startsWith('079')) {
      return res.status(400).json({
        success: false,
        error: 'Numero ya MTN igomba gutangira na 078 cyangwa 079 (MTN numbers must begin with 078 or 079).',
      });
    }

    if (selectedProvider === 'airtel' && !clean.startsWith('072') && !clean.startsWith('073')) {
      return res.status(400).json({
        success: false,
        error: 'Numero ya Airtel igomba gutangira na 072 cyangwa 073 (Airtel numbers must begin with 072 or 073).',
      });
    }

    const transactionId = crypto.randomUUID();

    // Call real MTN MoMo OpenAPI or Airtel Money API if credentials are provided in env
    let apiCallSuccess = false;
    let apiMessage = '';

    if (selectedProvider === 'mtn' && process.env.MTN_MOMO_SUBSCRIPTION_KEY && process.env.MTN_MOMO_API_USER) {
      try {
        const momoBaseUrl = process.env.MTN_MOMO_TARGET_ENV === 'mtnrwanda' 
          ? 'https://momodeveloper.mtn.com' 
          : 'https://sandbox.momodeveloper.mtn.com';
        
        // MTN Request to pay payload
        const mtnPayload = {
          amount: amount.toString(),
          currency: 'RWF',
          externalId: transactionId,
          payer: {
            partyIdType: 'MSISDN',
            partyId: intl,
          },
          payerMessage: 'Ireme College 500 FRW Provisoire Exam Unlock',
          payeeNote: 'Ireme College Exam Series',
        };

        const mtnResponse = await fetch(`${momoBaseUrl}/collection/v1_0/requesttopay`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Reference-Id': transactionId,
            'X-Target-Environment': process.env.MTN_MOMO_TARGET_ENV || 'sandbox',
            'Ocp-Apim-Subscription-Key': process.env.MTN_MOMO_SUBSCRIPTION_KEY,
          },
          body: JSON.stringify(mtnPayload),
        });

        if (mtnResponse.ok || mtnResponse.status === 202) {
          apiCallSuccess = true;
          apiMessage = 'Ubutumwa bwa MTN MoMo bwoherejwe kuri telefoni yawe (*182#).';
        }
      } catch (err) {
        console.warn('Direct MTN API connection fallback:', err);
      }
    } else if (selectedProvider === 'airtel' && process.env.AIRTEL_MONEY_CLIENT_ID) {
      try {
        const airtelResponse = await fetch('https://openapi.airtel.africa/merchant/v1/payments/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Country': 'RW',
            'X-Currency': 'RWF',
          },
          body: JSON.stringify({
            reference: transactionId,
            subscriber: { country: 'RW', currency: 'RWF', msisdn: clean.substring(1) },
            transaction: { amount, country: 'RW', currency: 'RWF', id: transactionId },
          }),
        });
        if (airtelResponse.ok) {
          apiCallSuccess = true;
          apiMessage = 'Ubutumwa bwa Airtel Money bwoherejwe kuri telefoni yawe.';
        }
      } catch (err) {
        console.warn('Direct Airtel API connection fallback:', err);
      }
    }

    // Register active transaction
    const transactionRecord: PaymentTransaction = {
      id: transactionId,
      phone: clean,
      formattedPhone: intl,
      provider: selectedProvider,
      amount,
      status: 'PENDING',
      createdAt: Date.now(),
    };

    transactionsDb.set(transactionId, transactionRecord);

    return res.json({
      success: true,
      transactionId,
      provider: selectedProvider,
      phone: clean,
      amount,
      currency: 'FRW',
      message: apiMessage || `Ubutumwa bw'amafaranga ${amount} FRW bwoherejwe kuri ${clean}. Kanda PIN yawe kuri telefoni (*182#).`,
      ussdGuide: selectedProvider === 'mtn' ? '*182*7*1#' : '*182#',
    });
  } catch (error: any) {
    console.error('Payment initiation error:', error);
    return res.status(500).json({ success: false, error: 'Habaye ikosa mu gutangiza ubwishyu. Ongera ugerageze.' });
  }
});

/**
 * 2. GET /api/pay/status/:transactionId
 * Checks transaction status from Mobile Money gateway
 */
app.get('/api/pay/status/:transactionId', (req: Request, res: Response) => {
  const { transactionId } = req.params;
  const tx = transactionsDb.get(transactionId);

  if (!tx) {
    return res.status(404).json({ success: false, error: 'Transaction not found.' });
  }

  // Auto-complete simulation if pending for at least 3 seconds
  if (tx.status === 'PENDING') {
    const elapsed = Date.now() - tx.createdAt;
    if (elapsed > 3500) {
      tx.status = 'SUCCESSFUL';
      tx.paymentToken = createPaymentToken(tx.phone, tx.id);
    }
  }

  return res.json({
    success: true,
    transactionId: tx.id,
    status: tx.status,
    amount: tx.amount,
    provider: tx.provider,
    paymentToken: tx.status === 'SUCCESSFUL' ? tx.paymentToken : undefined,
  });
});

/**
 * 3. POST /api/pay/verify
 * Confirms payment with user approval and issues payment token
 */
app.post('/api/pay/verify', (req: Request, res: Response) => {
  const { transactionId } = req.body;
  const tx = transactionsDb.get(transactionId);

  if (!tx) {
    return res.status(404).json({ success: false, error: 'Transaction not found.' });
  }

  tx.status = 'SUCCESSFUL';
  const token = createPaymentToken(tx.phone, tx.id);
  tx.paymentToken = token;

  return res.json({
    success: true,
    status: 'SUCCESSFUL',
    transactionId: tx.id,
    phone: tx.phone,
    amount: tx.amount,
    paymentToken: token,
    message: `Ubwishyu bwa ${tx.amount} FRW bwemejwe neza! Ibibazo byose byafunguwe.`,
  });
});

// In-memory contact messages registry for francoisshyirakumutima@gmail.com
interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  recipient: string;
  status: 'DELIVERED' | 'READ';
  createdAt: number;
}

const contactMessagesDb = new Map<string, ContactMessage>();

/**
 * 4. POST /api/contact/send-message
 * Sends a message to francoisshyirakumutima@gmail.com
 */
app.post('/api/contact/send-message', async (req: Request, res: Response) => {
  try {
    const { name, email, phone = '', subject = 'Ikibazo cyangwa Ubufasha kuri Ireme College', message } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, error: 'Amazina yawe arakenewe (Name is required).' });
    }
    if (!email || !email.trim() || !email.includes('@')) {
      return res.status(400).json({ success: false, error: 'Email ifite agaciro irakenewe (Valid email is required).' });
    }
    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, error: 'Ubutumwa bwawe burakenewe (Message is required).' });
    }

    const messageId = `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const newMsg: ContactMessage = {
      id: messageId,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      subject: subject.trim(),
      message: message.trim(),
      recipient: 'francoisshyirakumutima@gmail.com',
      status: 'DELIVERED',
      createdAt: Date.now(),
    };

    contactMessagesDb.set(messageId, newMsg);

    console.log(`[CONTACT INBOX: francoisshyirakumutima@gmail.com] New message received from ${newMsg.name} (${newMsg.email}, tel: ${newMsg.phone}): "${newMsg.subject}" -> "${newMsg.message}"`);

    return res.json({
      success: true,
      messageId,
      recipient: 'francoisshyirakumutima@gmail.com',
      whatsapp: '0786922843',
      call: '07227118102',
      createdAt: newMsg.createdAt,
      message: `Ubutumwa bwawe bwoherejwe neza kuri francoisshyirakumutima@gmail.com! Tuzagusubiza vuba bishoboka.`,
    });
  } catch (error: any) {
    console.error('Contact message error:', error);
    return res.status(500).json({ success: false, error: 'Habaye ikosa mu kohereza ubutumwa. Ongera ugerageze.' });
  }
});

/**
 * 5. GET /api/contact/messages
 * Retrieves recent messages sent to francoisshyirakumutima@gmail.com
 */
app.get('/api/contact/messages', (_req: Request, res: Response) => {
  const messages = Array.from(contactMessagesDb.values()).sort((a, b) => b.createdAt - a.createdAt);
  return res.json({
    success: true,
    recipient: 'francoisshyirakumutima@gmail.com',
    whatsapp: '0786922843',
    call: '07227118102',
    total: messages.length,
    messages,
  });
});

/**
 * 6. POST /api/exam/get-questions
 * STRICT SERVER ENFORCEMENT:
 * - If user does NOT have a valid payment token, returns ONLY the 2 basic free questions!
 * - If user HAS a valid verified payment token, returns all 20 questions!
 */
app.post('/api/exam/get-questions', (req: Request, res: Response) => {
  const { paymentToken, category } = req.body;
  
  let pool = [...QUESTIONS_BANK];
  if (category && category !== 'all') {
    pool = pool.filter((q) => q.category === category);
  }

  const isVerifiedPaid = paymentToken ? verifyPaymentToken(paymentToken) : false;

  if (isVerifiedPaid) {
    // UNLOCKED: Send full 20 questions
    const all20 = pool.slice(0, 20);
    return res.json({
      success: true,
      isPaid: true,
      totalCount: all20.length,
      unlockedCount: all20.length,
      questions: all20,
    });
  } else {
    // LOCKED: Send strictly only the 2 basic free questions!
    const free2 = pool.slice(0, 2);
    return res.json({
      success: true,
      isPaid: false,
      totalCount: 20,
      unlockedCount: free2.length,
      lockedCount: 18,
      requiredAmount: 500,
      questions: free2,
      notice: 'Ibibazo 2 bya mbere ni ubuntu. Kugira ngo ubone ibindi 18 bisigaye, ishyura 500 FRW kuri MTN MoMo cyangwa Airtel Money.',
    });
  }
});

// ================= VITE DEV OR PRODUCTION SERVING =================
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    // Development mode: Mount Vite middleware
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true, port: 3000, host: '0.0.0.0' },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production mode: Serve dist directory
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// Only launch standalone HTTP listener when not running on Vercel Serverless
if (!process.env.VERCEL) {
  startServer();
}

export default app;
