import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { VacancyStateModel } from "../../models/vacancyModel";
import {
  FifthQuestion,
  FirstQuestion,
  FourthQuestion,
  UserInfoQuestion,
  ThirdQuestion,
  getStarted,
  SecondQuestion,
} from "../thunks/vacancy";
import { RootState } from "../store";
import { updateState } from "../../utils/utils";

const initialState: VacancyStateModel = {
  isLoading: false,
  allQuestions: [],
  isInputShow: false,
  firstQuestion: false,
  secondQuestion: false,
  thirdQuestion: false,
  fourthQuestion: false,
  fifthQuestion: false,
  chatBotDataOutput: {},
  previousChat: [],
  isQuestionShow: false,
  isSuccess: false,
  placeholder: "",
  inputType: "",
  showStartLine:false,
  showMidLine:false,
  showEndLine:false,
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
        state.placeholder = action.payload.placeholder;
        state.inputType = action.payload.inputType;
      }
    );
    builder.addCase(getStarted.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(UserInfoQuestion.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      UserInfoQuestion.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.allQuestions = action.payload.nextQuestion.answer;
        updateState(
          state,
          action.payload.StartLine,
          action.payload.MidLine,
          action.payload.EndLine,
          state.chatBotDataOutput
        );
        state.isInputShow = false;
        state.firstQuestion = true;
        state.isSuccess = true;
      }
    );
    builder.addCase(UserInfoQuestion.rejected, (state) => {
      state.isLoading = false;
      state.isSuccess = false;
    });
    builder.addCase(FirstQuestion.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
    });
    builder.addCase(
      FirstQuestion.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.allQuestions = action.payload.nextQuestion.answer;
        updateState(
          state,
          action.payload.StartLine,
          action.payload.MidLine,
          action.payload.EndLine,
          state.chatBotDataOutput
        );
        state.isLoading = false;
        state.isSuccess = true;
        state.placeholder = action.payload.nextQuestion.placeHolder;
        state.inputType = action.payload.nextQuestion.type;
        state.isInputShow = action.payload.nextQuestion.showTextArea;
        state.secondQuestion = true;
        state.firstQuestion = false;
      }
    );
    builder.addCase(FirstQuestion.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(SecondQuestion.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
    });
    builder.addCase(
      SecondQuestion.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.allQuestions = action.payload.nextQuestion.answer;
        updateState(
          state,
          action.payload.StartLine,
          action.payload.MidLine,
          action.payload.EndLine,
          state.chatBotDataOutput
        );
        state.isLoading = false;
        state.isSuccess = true;
        state.placeholder = action.payload.placeHolder;
        state.inputType = action.payload.type;
        state.isInputShow = action.payload.showTextArea;
        state.secondQuestion = false;
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
        updateState(
          state,
          action.payload.StartLine,
          action.payload.MidLine,
          action.payload.EndLine,
          state.chatBotDataOutput
        );
        state.allQuestions = action.payload.nextQuestion.answer;
        state.isInputShow = false;
        state.thirdQuestion = false;
        state.fourthQuestion = true;
      }
    );
    builder.addCase(ThirdQuestion.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(FifthQuestion.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      FifthQuestion.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        updateState(
          state,
          action.payload.StartLine,
          action.payload.MidLine,
          action.payload.EndLine,
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

export const selectFirstQuestion = (state: RootState) => {
  return state.vacancy.firstQuestion;
};
export const selectSecondQuestion = (state: RootState) => {
  return state.vacancy.secondQuestion;
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
export const selectPlaceholder = (state: RootState) => {
  return state.vacancy.placeholder;
};
export const selectInputType = (state: RootState) => {
  return state.vacancy.inputType;
};

export const vacancyReducer = vacancySlice.reducer;
