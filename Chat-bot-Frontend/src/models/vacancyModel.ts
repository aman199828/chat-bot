export interface Question {
  question: string;
}
export interface VacancyState {
  isLoading: boolean;
  allQuestions: [];
  isInputShow: boolean;
  thirdQuestion: boolean;
  fourthQuestion: boolean;
  fifthQuestion: boolean;
  previousChat: {
    role: string;
    content: string;
    date: string;
  }[];
  chatBotDataOutput: {};
  isQuestionShow: boolean;
  isSuccess: boolean;
}
export interface VacancyStateModel {
  isLoading: boolean;
  allQuestions: [];
  isInputShow: boolean;
  thirdQuestion: boolean;
  fourthQuestion: boolean;
  fifthQuestion: boolean;
  previousChat: {
    role: string;
    content: string;
    date: string;
    midLine: string;
    endLine: string;
  }[];
  chatBotDataOutput: {};
  isQuestionShow: boolean;
  isSuccess: boolean;
}
export interface SecondQuestionPayload {
  email: string;
}
export interface FirstQuestionPayload {
  selectedAnswer: string;
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

export type Van = [];
export interface VacancyAllQuestionResponse {
  data: [];
}
