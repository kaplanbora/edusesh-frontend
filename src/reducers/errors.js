import {CLEAR_ERROR, ERR_SUBMIT} from "../actions/types";

const initialState = {
  submit: null
};

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ERR_SUBMIT:
      return {
        submit: action.payload
      };
    case CLEAR_ERROR:
      if (action.payload === "submit") {
        return initialState;
      } else {
        return initialState;
      }
    default:
      return state;
  }
};

export default errorReducer
