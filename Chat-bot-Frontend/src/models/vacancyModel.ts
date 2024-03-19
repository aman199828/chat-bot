export interface Question {
  id: number;
  question: string;
}
export interface VacancyState {
  isLoading: boolean;
  allQuestions: Question[];
  isInputShow: boolean;
  nextQuestion: string;
}
export interface SecondQuestionPayload {
  email: string;
  phoneNumber: Number;
}

export type Van = Question[];
export interface VacancyAllQuestionResponse {
  data: {
    data: Question[];
  };
}
