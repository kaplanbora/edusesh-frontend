import Cookies from 'universal-cookie';
import {CLEAR_ERROR, LOAD_TOKEN} from "./types";

export const clearError = errorName => ({
  type: CLEAR_ERROR,
  payload: errorName
});

export const tokenFromCookie = () => {
  const cookie = new Cookies();
  const token = cookie.get("token");
  return {
    type: LOAD_TOKEN,
    payload: token ? token : null
  }
};