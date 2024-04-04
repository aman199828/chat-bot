/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  QuestionPayload,
  UserInfoQuestionPayload,
  VacancyAllQuestionResponse,
} from "../../models/vacancyModel";

export const getStarted = createAsyncThunk(
  "api/getStarted",
  async (_, thunkAPI) => {
    try {
      const response: VacancyAllQuestionResponse = await axios(
        "http://localhost:3030/chatbot/getStarted"
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const UserInfoQuestion = createAsyncThunk(
  "api/UserInfoQuestion",
  async (payload: UserInfoQuestionPayload, thunkAPI) => {
    try {
      const response: VacancyAllQuestionResponse = await axios.post(
        "http://localhost:3030/chatbot/userInfo",
        payload
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const FirstQuestion = createAsyncThunk(
  "api/FirstQuestion",
  async (payload: QuestionPayload, thunkAPI) => {
    try {
      const response: VacancyAllQuestionResponse = await axios.post(
        "http://localhost:3030/chatbot/first-question",
        payload
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const SecondQuestion = createAsyncThunk(
  "api/SecondQuestion",
  async (payload: QuestionPayload, thunkAPI) => {
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
  async (payload: QuestionPayload, thunkAPI) => {
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
  async (payload: QuestionPayload, thunkAPI) => {
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
  async (payload: QuestionPayload, thunkAPI) => {
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
