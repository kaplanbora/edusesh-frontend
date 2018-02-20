import {ERR_SUBMIT} from "../actions/types";

const initialState = {
  submit: null
};

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ERR_SUBMIT:
      return {
        submit: action.payload
      };

    default:
      return state;
  }
};

export default errorReducer
