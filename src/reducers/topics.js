import {LOAD_MAIN_TOPICS} from "../actions/types";

const initialState = [];

const topicsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_MAIN_TOPICS:
      return action.payload.data;
    default:
      return state;
  }
};

export default topicsReducer