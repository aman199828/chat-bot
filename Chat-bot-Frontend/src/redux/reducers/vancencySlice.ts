import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { VacancyState } from "../../models/vacancyModel";
import {
  FifthQuestion,
  FirstQuestion,
  FourthQuestion,
  SecondQuestion,
  ThirdQuestion,
  getAllQuestions,
} from "../thunks/vacancy";
import { RootState } from "../store";
import { updateStateIfDifferent } from "../../utils/utils";

const initialState: VacancyState = {
  isLoading: false,
  allQuestions: [],
  isInputShow: false,
  thirdQuestion: false,
  fourthQuestion: false,
  fifthQuestion: false,
  chatBotDataOutput: {},
  previousChat: [],
  isQuestionShow: false,
  isSuccess: false,
};
const vacancySlice = createSlice({
  name: "vacancy",
  initialState,
  reducers: {
    updatePreviousChat: (state, action) => {
      state.previousChat.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllQuestions.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getAllQuestions.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.allQuestions = action.payload.data;
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
        updateStateIfDifferent(
          state,
          action.payload.question,
          state.chatBotDataOutput
        );
        state.isLoading = false;
        state.isInputShow = action.payload.showInput;
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
        state.allQuestions = action.payload.nextQuestion.answer;
        updateStateIfDifferent(
          state,
          action.payload.nextQuestion.question,
          state.chatBotDataOutput
        );
        state.isInputShow = false;
        state.thirdQuestion = true;
      }
    );
    builder.addCase(SecondQuestion.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(ThirdQuestion.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      ThirdQuestion.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        updateStateIfDifferent(
          state,
          action.payload.nextQuestion.question,
          state.chatBotDataOutput
        );
        state.allQuestions = action.payload.nextQuestion.answer;
        state.isInputShow = false;
        state.fourthQuestion = true;
      }
    );
    builder.addCase(ThirdQuestion.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(FourthQuestion.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      FourthQuestion.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        updateStateIfDifferent(
          state,
          action.payload.nextQuestion.question,
          state.chatBotDataOutput
        );
        state.allQuestions = action.payload.nextQuestion.answer;
        state.isInputShow = false;
        state.thirdQuestion = false;
        state.fifthQuestion = true;
      }
    );
    builder.addCase(FourthQuestion.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(FifthQuestion.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      FifthQuestion.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        updateStateIfDifferent(
          state,
          action.payload.message,
          state.chatBotDataOutput
        );
        state.isInputShow = false;
        state.thirdQuestion = false;
        state.fourthQuestion = false;
        state.fifthQuestion = false;
        state.isQuestionShow = true;
      }
    );
    builder.addCase(FifthQuestion.rejected, (state) => {
      state.isLoading = false;
    });
  },
});
export const vacancyActions = vacancySlice.actions;
export const selectAllQuestions = (state: RootState) => {
  return state.vacancy.allQuestions;
};
export const selectIsInputShow = (state: RootState) => {
  return state.vacancy.isInputShow;
};
export const selectIsLoading = (state: RootState) => {
  return state.vacancy.isLoading;
};
export const selectThirdQuestion = (state: RootState) => {
  return state.vacancy.thirdQuestion;
};
export const selectFourthQuestion = (state: RootState) => {
  return state.vacancy.fourthQuestion;
};
export const selectFifthQuestion = (state: RootState) => {
  return state.vacancy.fifthQuestion;
};
export const selectIsQuestionShow = (state: RootState) => {
  return state.vacancy.isQuestionShow;
};
export const selectPreviousChat = (state: RootState) => {
  return state.vacancy.previousChat;
};
export const selectIsSuccess = (state: RootState) => {
  return state.vacancy.isSuccess;
};

export const vacancyReducer = vacancySlice.reducer;
