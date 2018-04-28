import {LOAD_RESULTS} from "../actions/types";

const initialState = [];

export const resultsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_RESULTS:
      return action.payload.data;
    default:
      return state;
  }
};