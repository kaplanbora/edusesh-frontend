import tokenReducer from "./token";
import userReducer from "./user";
import errorReducer from "./errors";
import modalReducer from "./modals";
import {combineReducers} from "redux";
import {reducer as formReducer} from "redux-form";

const eduseshReducers = combineReducers({
  user: userReducer,
  token: tokenReducer,
  errors: errorReducer,
  modals: modalReducer,
  form: formReducer
});

export default eduseshReducers
