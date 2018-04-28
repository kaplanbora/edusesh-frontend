import {FILTER_RESULTS, LOAD_RESULTS} from "../actions/types";

const initialState = [];

export const resultsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_RESULTS:
      return action.payload.data;
    case FILTER_RESULTS:
      const maxHourly = action.payload.filters.hourlyRate;
      const minCount = action.payload.filters.sessionCount;
      const minRating = action.payload.filters.rating;
      let result = action.payload.data;
      if (maxHourly != undefined) {
        result = result.filter(instructor => instructor.hourlyRate <= maxHourly);
      }
      if (minCount != undefined) {
        result = result.filter(instructor => instructor.sessionCount >= minCount)
      }
      if (minRating != undefined) {
        result = result.filter(instructor => instructor.rating >= minRating)
      }
      return result;

    default:
      return state;
  }
};