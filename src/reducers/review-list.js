import {LOAD_REVIEWS} from "../actions/types";

const initialState = [];

export const reviewListReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_REVIEWS:
      return action.payload.data;
    default:
      return state;
  }
};
