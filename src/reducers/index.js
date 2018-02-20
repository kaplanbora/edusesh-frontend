import tokenReducer from "./token";
import userReducer from "./user";
import errorReducer from "./errors";
import {combineReducers} from "redux";
import {reducer as formReducer} from "redux-form";

const eduseshReducers = combineReducers({
  user: userReducer,
  token: tokenReducer,
  errors: errorReducer,
  form: formReducer
});

export default eduseshReducers
