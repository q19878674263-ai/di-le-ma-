
export type Page = 'QUIZ' | 'WAITING' | 'RESULT' | 'SQUARE';

export type Tab = '破口大马' | '电子草料';

export interface QuizQuestion {
  id: string;
  text: string;
  hint: string;
}

export interface HorseResult {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface Post {
  id: string;
  type: Tab;
  author: string;
  content: string;
  timestamp: string;
}
