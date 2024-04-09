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
export const updateLiveChatState = (
  state: VacancyStateModel,
  startLine: string,
  midLine: string,
  endLine: string,
) => {
    state.liveChat.content = startLine;
    state.liveChat.midLine = midLine;
    state.liveChat.endLine = endLine
    state.liveChat.date = new Date().toLocaleTimeString();
    state.liveChat.role ="EnsuesoftBot";

}