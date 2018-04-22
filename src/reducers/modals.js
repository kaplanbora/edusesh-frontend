import {
  MODAL_CLOSE_LOGIN, MODAL_CLOSE_REVIEW, MODAL_CLOSE_SESSION_REQUEST, MODAL_OPEN_LOGIN, MODAL_OPEN_REVIEW,
  MODAL_OPEN_SESSION_REQUEST
} from "../actions/types";

const initialState = {
  login: false,
  register: false,
  sessionRequest: false,
  review: false
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case MODAL_OPEN_LOGIN:
      return {
        login: true,
        register: state.register,
        sessionRequest: state.sessionRequest,
        review: state.review
      };
    case MODAL_CLOSE_LOGIN:
      return {
        login: false,
        register: state.register,
        sessionRequest: state.sessionRequest,
        review: state.review
      };
    case MODAL_OPEN_SESSION_REQUEST:
      return {
        login: state.login,
        register: state.register,
        sessionRequest: true,
        review: state.review
      };
    case MODAL_CLOSE_SESSION_REQUEST:
      return {
        login: state.login,
        register: state.register,
        sessionRequest: false,
        review: state.review
      };
    case MODAL_OPEN_REVIEW:
      return {
        login: state.login,
        register: state.register,
        sessionRequest: state.sessionRequest,
        review: true
      };
    case MODAL_CLOSE_REVIEW:
      return {
        login: state.login,
        register: state.register,
        sessionRequest: state.sessionRequest,
        review: false
      };
    default:
      return state;
  }
};

export default modalReducer