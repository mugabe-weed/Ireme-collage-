export type Language = 'rw' | 'en' | 'fr';

export type QuestionCategory = 
  | 'ibyapa' // Road signs
  | 'amategeko' // Traffic rules / Priority
  | 'umutekano' // Road safety & precautions
  | 'ubutabazi' // First aid & emergency
  | 'ibinyabiziga' // Vehicle mechanics & lights
  | 'ibisabwa'; // General regulations & Irembo

export interface QuestionOption {
  id: string;
  text: {
    rw: string;
    en: string;
    fr: string;
  };
}

export interface Question {
  id: string;
  category: QuestionCategory;
  question: {
    rw: string;
    en: string;
    fr: string;
  };
  options: QuestionOption[];
  correctAnswerId: string;
  explanation: {
    rw: string;
    en: string;
    fr: string;
  };
  legalReference?: string;
  signCode?: string;
  signSvgType?: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface RoadSign {
  id: string;
  code: string;
  category: 'warning' | 'priority' | 'prohibitory' | 'mandatory' | 'informative' | 'marking';
  name: {
    rw: string;
    en: string;
    fr: string;
  };
  meaning: {
    rw: string;
    en: string;
    fr: string;
  };
  actionRequired: {
    rw: string;
    en: string;
    fr: string;
  };
  svgType: string;
  legalArticle?: string;
}

export interface ExamRecord {
  id: string;
  date: string;
  score: number;
  total: number;
  passed: boolean;
  timeSpentSeconds: number;
  categoryBreakdown: Record<string, { correct: number; total: number }>;
}

export interface StudyTopic {
  id: string;
  title: {
    rw: string;
    en: string;
    fr: string;
  };
  summary: {
    rw: string;
    en: string;
    fr: string;
  };
  icon: string;
  readTime: string;
  content: {
    rw: string[];
    en: string[];
    fr: string[];
  };
  keyTakeaways: {
    rw: string[];
    en: string[];
    fr: string[];
  };
  legalCode?: string;
}

export interface UserProfile {
  name: string;
  phone: string;
  isPro: boolean;
  proExpiryDate?: string;
  planName?: string;
}

export interface TrafficFineItem {
  id: string;
  infraction: {
    rw: string;
    en: string;
    fr: string;
  };
  fineRwf: string;
  penaltyPoints?: number;
  legalRef: string;
  category: 'speed' | 'safety' | 'documents' | 'priority' | 'alcohol';
}

export interface LessonModule {
  id: string;
  title: {
    rw: string;
    en: string;
    fr: string;
  };
  description: {
    rw: string;
    en: string;
    fr: string;
  };
  duration: string;
  sectionsCount: number;
  chapters: {
    title: { rw: string; en: string; fr: string };
    content: { rw: string; en: string; fr: string };
    signType?: string;
  }[];
  quickCheck: {
    question: { rw: string; en: string; fr: string };
    options: { id: string; text: { rw: string; en: string; fr: string } }[];
    correctId: string;
  };
}
