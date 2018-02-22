import {CHANGE_SECTION} from "../actions/types";

const initialState = "profile";

const sectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_SECTION:
      return action.payload;
    default:
      return state;
  }
};

export default sectionReducer