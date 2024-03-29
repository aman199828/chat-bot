import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { VacancyStateModel } from "../../models/vacancyModel";
import {
  FifthQuestion,
  FirstQuestion,
  FourthQuestion,
  UserInfoQuestion,
  ThirdQuestion,
  getStarted,
} from "../thunks/vacancy";
import { RootState } from "../store";
import { updateState, updateStateIfDifferent } from "../../utils/utils";

const initialState: VacancyStateModel = {
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
    builder.addCase(getStarted.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getStarted.fulfilled,
      (state, action: PayloadAction<any>) => {
        updateState(
          state,
          action.payload.StartLine,
          action.payload.MidLine,
          action.payload.EndLine,
          state.chatBotDataOutput
        );
        state.isInputShow = action.payload.showInput;
        state.isLoading = false;
      }
    );
    builder.addCase(getStarted.rejected, (state) => {
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
      }
    );
    builder.addCase(FirstQuestion.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(UserInfoQuestion.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      UserInfoQuestion.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.allQuestions = action.payload.nextQuestion;
        updateStateIfDifferent(
          state,
          action.payload.Question,
          state.chatBotDataOutput
        );
        state.isInputShow = false;
        state.thirdQuestion = true;
        state.isSuccess = true;
      }
    );
    builder.addCase(UserInfoQuestion.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(ThirdQuestion.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
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
        state.isSuccess = true;
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
