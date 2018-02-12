import {combineReducers} from "redux";
import {LOGIN_REQUEST, REGISTER_REQUEST} from "../actions/types";

const tokenReducer = (state = null, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return action.token ? action.token : null;
    default:
      return state;
  }
};

const initialRegisterPage = {
  email: {
    status: null,
    message: null,
  },
  password: {
    status: null,
    message: null,
  }
};

const registerReducer = (state = initialRegisterPage, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return state;
    default:
      return state;
  }
};

const eduseshReducers = combineReducers({
  token: tokenReducer,
  registerPage: registerReducer
});

export default eduseshReducers
