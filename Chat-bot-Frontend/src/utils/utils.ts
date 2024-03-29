import { VacancyState, VacancyStateModel } from "../models/vacancyModel";

export const updateStateIfDifferent = (
  state: VacancyState,
  startLine: string,
  propertyName: {}
) => {
  if (JSON.stringify(propertyName) !== JSON.stringify(startLine)) {
    propertyName = startLine;
    state.isSuccess = true;
    state.previousChat.push({
      role: "EnsuesoftBot",
      content: startLine,
      date: new Date().toLocaleTimeString(),
    });
  }
};
export const updateState = (
  state: VacancyStateModel,
  startLine: string,
  midLine: string,
  endLine: string,
  propertyName: {}
) => {
  if (JSON.stringify(propertyName) !== JSON.stringify(startLine)) {
    propertyName = startLine;
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
