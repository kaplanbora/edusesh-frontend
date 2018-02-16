import Cookies from 'universal-cookie';
import {combineReducers} from "redux";
import {LOGIN_SUCCESSFUL, REGISTER_REQUEST, SET_TOKEN} from "../actions/types";
import {reducer as formReducer} from "redux-form";

const tokenReducer = (state = null, action) => {
  switch (action.type) {
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
  }
  return state;
};

const eduseshReducers = combineReducers({
  token: tokenReducer,
  form: formReducer
});

export default eduseshReducers
