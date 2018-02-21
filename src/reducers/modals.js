import {MODAL_CLOSE_LOGIN, MODAL_OPEN_LOGIN} from "../actions/types";

const initialState = {
  login: false,
  register: false,
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case MODAL_OPEN_LOGIN:
      return {
        login: true,
        register: state.register
      };
    case MODAL_CLOSE_LOGIN:
      return {
        login: false,
        register: state.register
      };
    default:
      return state;
  }
};

export default modalReducer