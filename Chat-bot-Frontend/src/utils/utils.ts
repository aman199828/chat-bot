import { VacancyState } from "../models/vacancyModel";

export const updateStateIfDifferent = (
  state: VacancyState,
  payload: any,
  propertyName: {}
) => {
  if (JSON.stringify(propertyName) !== JSON.stringify(payload)) {
    propertyName = payload;
    state.isSuccess = true;
    state.previousChat.push({
      role: "EnsuesoftBot",
      content: payload,
      date: new Date().toLocaleTimeString(),
    });
  }
};
