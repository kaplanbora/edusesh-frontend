import {
  MODAL_CLOSE_LOGIN, MODAL_CLOSE_SESSION_REQUEST, MODAL_OPEN_LOGIN,
  MODAL_OPEN_SESSION_REQUEST
} from "../actions/types";

const initialState = {
  login: false,
  register: false,
  sessionRequest: false
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case MODAL_OPEN_LOGIN:
      return {
        login: true,
        register: state.register,
        sessionRequest: state.sessionRequest
      };
    case MODAL_CLOSE_LOGIN:
      return {
        login: false,
        register: state.register,
        sessionRequest: state.sessionRequest
      };
    case MODAL_OPEN_SESSION_REQUEST:
      return {
        login: state.login,
        register: state.register,
        sessionRequest: true
      };
    case MODAL_CLOSE_SESSION_REQUEST:
      return {
        login: state.login,
        register: state.register,
        sessionRequest: false
      };
    default:
      return state;
  }
};

export default modalReducer