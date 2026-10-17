export interface InitiatePaymentResponse {
  success: boolean;
  transactionId?: string;
  provider?: 'mtn' | 'airtel';
  phone?: string;
  amount?: number;
  currency?: string;
  message?: string;
  ussdGuide?: string;
  error?: string;
}

export interface PaymentStatusResponse {
  success: boolean;
  transactionId?: string;
  status?: 'PENDING' | 'SUCCESSFUL' | 'FAILED';
  amount?: number;
  provider?: string;
  paymentToken?: string;
  error?: string;
}

export interface GetQuestionsResponse {
  success: boolean;
  isPaid: boolean;
  totalCount: number;
  unlockedCount: number;
  lockedCount?: number;
  requiredAmount?: number;
  questions: any[];
  notice?: string;
}

export const PaymentAPI = {
  // 1. Initiate Real MTN MoMo / Airtel Money Payment for 500 FRW
  async initiatePayment(phone: string, provider: 'mtn' | 'airtel', amount: number = 500): Promise<InitiatePaymentResponse> {
    const res = await fetch('/api/pay/initiate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, provider, amount }),
    });
    return res.json();
  },

  // 2. Poll transaction status
  async checkPaymentStatus(transactionId: string): Promise<PaymentStatusResponse> {
    const res = await fetch(`/api/pay/status/${transactionId}`);
    return res.json();
  },

  // 3. Confirm payment approval
  async verifyPayment(transactionId: string, phone: string): Promise<PaymentStatusResponse> {
    const res = await fetch('/api/pay/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ transactionId, phone }),
    });
    return res.json();
  },

  // 4. Fetch questions from server with payment verification
  async fetchExamQuestions(paymentToken?: string, category?: string): Promise<GetQuestionsResponse> {
    const res = await fetch('/api/exam/get-questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paymentToken, category }),
    });
    return res.json();
  },
};
