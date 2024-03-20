import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { VacancyState, Van } from "../../models/vacancyModel";
import {
  FirstQuestion,
  SecondQuestion,
  getAllQuestions,
} from "../thunks/vacancy";
import { RootState } from "../store";

const initialState: VacancyState = {
  isLoading: false,
  allQuestions: [],
  answer: [],
  isInputShow: false,
  nextQuestion: "",
  isAllQuestionShow: false,
};
const vacancySlice = createSlice({
  name: "vacancy",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllQuestions.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getAllQuestions.fulfilled,
      (state, action: PayloadAction<Van>) => {
        state.isLoading = false;
        state.allQuestions = action.payload;
      }
    );
    builder.addCase(getAllQuestions.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(FirstQuestion.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      FirstQuestion.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.nextQuestion = action.payload.message;
        state.isInputShow = action.payload.showInput;
        state.isAllQuestionShow = true;
      }
    );
    builder.addCase(FirstQuestion.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(SecondQuestion.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      SecondQuestion.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.nextQuestion = action.payload.nextQuestion.subQuestion.question;
        state.isInputShow = false;
        state.answer = action.payload.nextQuestion.subQuestion.answer;
      }
    );
    builder.addCase(SecondQuestion.rejected, (state) => {
      state.isLoading = false;
    });
  },
});
export const selectAllQuestions = (state: RootState) => {
  return state.vacancy.allQuestions;
};
export const selectAnswer = (state: RootState) => {
  return state.vacancy.answer;
};
export const selectIsInputShow = (state: RootState) => {
  return state.vacancy.isInputShow;
};
export const selectIsAllQuestionShow = (state: RootState) => {
  return state.vacancy.isAllQuestionShow;
};
export const selectNextQuestion = (state: RootState) => {
  return state.vacancy.nextQuestion;
};

export const vacancyReducer = vacancySlice.reducer;
