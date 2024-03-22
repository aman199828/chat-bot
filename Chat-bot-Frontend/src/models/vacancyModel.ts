export interface Question {
  id: number;
  question: string;
}
export interface VacancyState {
  isLoading: boolean;
  allQuestions: Question[];
  isInputShow: boolean;
  nextQuestion: string;
  isAllQuestionShow: boolean;
  thirdQuestion: boolean;
  fourthQuestion: boolean;
  previousChat: [];
  answer: [];
  chatBotDataOutput: {};
}
export interface SecondQuestionPayload {
  email: string;
  phoneNumber: Number;
}
export interface ThirdQuestionPayload {
  email: string;
  selectedTech: string;
}
export interface FourthQuestionPayload {
  email: string;
  yearExp: string;
}
export interface FifthQuestionPayload {
  email: string;
  traning: string;
}

export type Van = Question[];
export interface VacancyAllQuestionResponse {
  data: {
    data: Question[];
  };
}
