import {LOAD_SESSION} from "../actions/types";

const initialValue = null;

export const sessionReducer = (state = initialValue, action) => {
  switch(action.type) {
    case LOAD_SESSION:
      return action.payload;

    default:
      return state;
  }
};