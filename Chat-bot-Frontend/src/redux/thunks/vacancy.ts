/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  FifthQuestionPayload,
  FourthQuestionPayload,
  SecondQuestionPayload,
  ThirdQuestionPayload,
  VacancyAllQuestionResponse,
} from "../../models/vacancyModel";

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
export const FirstQuestion = createAsyncThunk(
  "api/FirstQuestion",
  async (questionId: number, thunkAPI) => {
    try {
      const response: VacancyAllQuestionResponse = await axios.post(
        "http://localhost:3030/chatbot/first-question",
        questionId
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const SecondQuestion = createAsyncThunk(
  "api/SecondQuestion",
  async (payload: SecondQuestionPayload, thunkAPI) => {
    try {
      const response: VacancyAllQuestionResponse = await axios.post(
        "http://localhost:3030/chatbot/second-question",
        payload
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const ThirdQuestion = createAsyncThunk(
  "api/ThirdQuestion",
  async (payload: ThirdQuestionPayload, thunkAPI) => {
    try {
      const response: VacancyAllQuestionResponse = await axios.post(
        "http://localhost:3030/chatbot/third-question",
        payload
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const FourthQuestion = createAsyncThunk(
  "api/FourthQuestion",
  async (payload: FourthQuestionPayload, thunkAPI) => {
    try {
      const response: VacancyAllQuestionResponse = await axios.post(
        "http://localhost:3030/chatbot/fourth-question",
        payload
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const FifthQuestion = createAsyncThunk(
  "api/FifthQuestion",
  async (payload: FifthQuestionPayload, thunkAPI) => {
    try {
      const response: VacancyAllQuestionResponse = await axios.post(
        "http://localhost:3030/chatbot/fifth-question",
        payload
      );

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
