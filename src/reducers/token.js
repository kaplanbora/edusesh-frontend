import {AUTH_LOGOUT, AUTH_SET_TOKEN_NO_COOKIE, AUTH_SET_TOKEN, LOAD_TOKEN} from "../actions/types";
import Cookies from 'universal-cookie';

const initialState = null;

const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_LOGOUT:
      console.log("token");
      const cookies = new Cookies();
      cookies.remove("token");
      return initialState;

    case AUTH_SET_TOKEN_NO_COOKIE:
      return action.payload;

    case AUTH_SET_TOKEN:
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

    default:
      return state;
  }
};

export default tokenReducer
