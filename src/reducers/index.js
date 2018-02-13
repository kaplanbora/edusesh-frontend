import {combineReducers} from "redux";
import {LOGIN_SUCCESSFUL, REGISTER_REQUEST} from "../actions/types";
import {reducer as formReducer} from "redux-form";

const tokenReducer = (state = null, action) => {
  switch (action.type) {
    case LOGIN_SUCCESSFUL:
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
      return {
        email: state.email,
        password: {
          status: "error",
          message: "Password cannot be empty."
        }
      };
    default:
      return state;
  }
};

const eduseshReducers = combineReducers({
  token: tokenReducer,
  registerPage: registerReducer,
  form: formReducer
});

export default eduseshReducers
