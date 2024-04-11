import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { VacancyStateModel, chatContent } from "../../models/vacancyModel";
import {
  FifthQuestion,
  FirstQuestion,
  FourthQuestion,
  UserInfoQuestion,
  ThirdQuestion,
  getStarted,
  SecondQuestion,
  UploadFile,
} from "../thunks/vacancy";
import { RootState } from "../store";
import { updateLiveChatState, updateState } from "../../utils/utils";

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
  liveChat: {} as chatContent,
  isQuestionShow: false,
  isSuccess: false,
  placeholder: "",
  inputType: "",
  showStartLine: false,
  showMidLine: false,
  showEndLine: false,
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
        updateLiveChatState(
          state,
          action.payload.StartLine,
          action.payload.MidLine,
          action.payload.EndLine
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
      state.isSuccess = false;
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
        updateLiveChatState(
          state,
          action.payload.StartLine,
          action.payload.MidLine,
          action.payload.EndLine
        );
        state.isInputShow = false;
        state.firstQuestion = true;
      }
    );
    builder.addCase(UserInfoQuestion.rejected, (state) => {
      state.isSuccess = false;
      state.isLoading = false;
    });
    builder.addCase(FirstQuestion.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isInputShow = false;
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
        updateLiveChatState(
          state,
          action.payload.StartLine,
          action.payload.MidLine,
          action.payload.EndLine
        );
        state.isLoading = false;
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
      state.isInputShow = false;
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
        updateLiveChatState(
          state,
          action.payload.StartLine,
          action.payload.MidLine,
          action.payload.EndLine
        );
        state.isLoading = false;
        state.placeholder = action.payload.nextQuestion.placeHolder;
        state.inputType = action.payload.nextQuestion.type;
        state.isInputShow = action.payload.nextQuestion.showTextArea;
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
        updateLiveChatState(
          state,
          action.payload.StartLine,
          action.payload.MidLine,
          action.payload.EndLine
        );
        state.allQuestions = action.payload.nextQuestion.answer;
        state.isInputShow = action.payload.nextQuestion.showUploadBox;
        state.inputType = action.payload.nextQuestion.type;
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
        updateLiveChatState(
          state,
          action.payload.StartLine,
          action.payload.MidLine,
          action.payload.EndLine
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
    builder.addCase(UploadFile.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      UploadFile.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        console.log(action.payload);
      }
    );
    builder.addCase(UploadFile.rejected, (state) => {
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
export const selectLiveChatData = (state: RootState) => {
  return state.vacancy.liveChat;
};

export const vacancyReducer = vacancySlice.reducer;
