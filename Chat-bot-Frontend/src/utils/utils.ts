import {  VacancyStateModel } from "../models/vacancyModel";


export const updateState = (
  state: VacancyStateModel,
  startLine: string,
  midLine: string,
  endLine: string,
  propertyName: {}
) => {
const payload ={
  content: startLine,
  midLine: midLine,
  endLine: endLine,
  }
  if (JSON.stringify(propertyName) !== JSON.stringify(payload)) {
    propertyName = payload;
    state.isSuccess = true;
    state.previousChat.push({
      role: "EnsuesoftBot",
      content: startLine,
      midLine: midLine,
      endLine: endLine,
      date: new Date().toLocaleTimeString(),
    });
  }
};
