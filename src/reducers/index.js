import tokenReducer from "./token";
import userReducer from "./user";
import errorReducer from "./errors";
import modalReducer from "./modals";
import sectionReducer from "./section";
import topicsReducer from "./topics";
import {combineReducers} from "redux";
import {reducer as formReducer} from "redux-form";
import targetUserReducer from "./target";
import {sessionReducer} from "./session";

const eduseshReducers = combineReducers({
  user: userReducer,
  token: tokenReducer,
  errors: errorReducer,
  modals: modalReducer,
  section: sectionReducer,
  topics: topicsReducer,
  targetUser: targetUserReducer,
  session: sessionReducer,
  form: formReducer
});

export default eduseshReducers
