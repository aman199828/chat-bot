export interface Question {
  question: string;
}
export interface VacancyState {
  isLoading: boolean;
  allQuestions: [];
  isInputShow: boolean;
  firstQuestion: boolean;
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
  placeholder: string;
  inputType: string;
  secondQuestion: boolean;
}
export interface VacancyStateModel {
  isLoading: boolean;
  allQuestions: [];
  isInputShow: boolean;
  firstQuestion: boolean;
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
  placeholder: string;
  inputType: string;
  secondQuestion: boolean;
}
export interface UserInfoQuestionPayload {
  email: string;
}
export interface QuestionPayload {
  userEmail: string;
  selectedAnswer: string;
}

export type Van = [];
export interface VacancyAllQuestionResponse {
  data: [];
}
