import {SUBMIT_ERROR} from "../actions/types";

const initialState = {
  submit: null
};

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUBMIT_ERROR:
      return {
        submit: action.payload
      };

    default:
      return state;
  }
};

export default errorReducer
