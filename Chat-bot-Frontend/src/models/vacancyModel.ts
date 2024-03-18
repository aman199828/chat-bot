export interface Question {
  id: number;
  question: string;
}
export interface VacancyState {
  isLoading: boolean;
  allQuestions: Question[];
}

export type Van = Question[];
export interface VacancyAllQuestionResponse {
  data: {
    data: Question[];
  };
}
