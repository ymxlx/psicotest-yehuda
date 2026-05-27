export type QuizType = 'attachment' | 'love';

export interface Question {
  id: string;
  quizType: QuizType;
  text: string;
  dimension: string;
  options: Option[];
}

export interface Option {
  text: string;
  value: number;
}

export interface QuizResult {
  id: string;
  date: string;
  type: QuizType;
  scores: Record<string, number>;
  primaryType: string;
}

export interface ScoringLogic {
  primaryType: string;
  explanation: string;
  recommendations: string[];
}
