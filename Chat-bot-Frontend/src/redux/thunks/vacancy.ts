/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { VacancyAllQuestionResponse } from "../../models/vacancyModel";

export const getAllQuestions = createAsyncThunk(
  "api/getFirstQuestion",
  async (_, thunkAPI) => {
    try {
      const response: VacancyAllQuestionResponse = await axios(
        "http://localhost:3030/chatbot/first-question"
      );
      return response.data.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
