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
import {streamReducer} from "./stream";
import {chatReducer} from "./chat";
import {reviewReducer} from "./review";
import {resultsReducer} from "./results";
import {reviewListReducer} from "./review-list";

const eduseshReducers = combineReducers({
  user: userReducer,
  token: tokenReducer,
  errors: errorReducer,
  modals: modalReducer,
  section: sectionReducer,
  topics: topicsReducer,
  targetUser: targetUserReducer,
  searchResults: resultsReducer,
  review: reviewReducer,
  reviewList: reviewListReducer,
  session: sessionReducer,
  stream: streamReducer,
  chat: chatReducer,
  form: formReducer
});

export default eduseshReducers
