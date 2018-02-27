import {ERR_CLEAR, ERR_SUBMIT} from "../actions/types";

const initialState = {
  submit: null
};

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ERR_SUBMIT:
      return {
        submit: action.payload
      };
    case ERR_CLEAR:
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
