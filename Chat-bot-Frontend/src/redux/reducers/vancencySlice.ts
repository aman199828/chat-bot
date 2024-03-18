import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { VacancyState, Van } from "../../models/vacancyModel";
import { getAllQuestions } from "../thunks/vacancy";
import { RootState } from "../store";

const initialState: VacancyState = {
  isLoading: false,
  allQuestions: [],
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
  },
});
export const selectAllQuestions = (state: RootState) => {
  return state.vacancy.allQuestions;
};
export const vacancyReducer = vacancySlice.reducer;
