import {ERR_CLEAR, ERR_LOGIN, ERR_SESSION_REQUEST} from "../actions/types";

const initialState = {
  login: null,
  sessionRequest: null
};

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ERR_LOGIN:
      return {
        login: action.payload,
        sessionRequest: null
      };
    case ERR_SESSION_REQUEST:
      return {
        login: null,
        sessionRequest: action.payload
      };
    case ERR_CLEAR:
      return initialState;
    default:
      return state;
  }
};

export default errorReducer
