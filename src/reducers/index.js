import tokenReducer from "./token";
import userReducer from "./user";
import errorReducer from "./errors";
import modalReducer from "./modals";
import sectionReducer from "./section";
import topicsReducer from "./topics";
import {combineReducers} from "redux";
import {reducer as formReducer} from "redux-form";
import targetUserReducer from "./target";

const eduseshReducers = combineReducers({
  user: userReducer,
  token: tokenReducer,
  errors: errorReducer,
  modals: modalReducer,
  section: sectionReducer,
  topics: topicsReducer,
  targetUser: targetUserReducer,
  form: formReducer
});

export default eduseshReducers
