import Cookies from 'universal-cookie';
import {combineReducers} from "redux";
import {
  LOAD_CREDENTIALS, LOAD_PROFILE, LOAD_TOKEN, LOGOUT, SET_TOKEN, SET_TOKEN_NO_COOKIE,
  SUBMIT_ERROR
} from "../actions/types";
import {reducer as formReducer} from "redux-form";

const tokenReducer = (state = null, action) => {
  switch (action.type) {
    case LOGOUT:
      console.log("token");
      const cookies = new Cookies();
      cookies.remove("token");
      return null;
    case SET_TOKEN_NO_COOKIE:
      return action.payload;
    case SET_TOKEN:
      if (action.payload) {
        const twoWeeksLater = Date.now() + (60 * 60 * 24 * 14 * 1000);
        const cookies = new Cookies();
        cookies.set("token", action.payload, {
          path: "/",
          expires: new Date(twoWeeksLater)
        });
        return action.payload;
      }
      break;
    case LOAD_TOKEN:
      return action.payload;
  }
  return state;
};

const initialState = {
  profile: {},
  credentials: {}
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT:
      return initialState;
    case LOAD_CREDENTIALS:
      const credentials = action.payload.data;
      return {
        profile: state.profile,
        credentials
      };
    case LOAD_PROFILE:
      const profile = action.payload.data;
      return {
        profile,
        credentials: state.credentials
      };
  }
  return state;
};

const initialErrors = {
  submit: null
};

const errorReducer = (state = initialErrors, action) => {
  switch (action.type) {
    case SUBMIT_ERROR:
      return {
        submit: action.payload
      };
  }
  return state;
};

const eduseshReducers = combineReducers({
  user: userReducer,
  token: tokenReducer,
  errors: errorReducer,
  form: formReducer
});

export default eduseshReducers
