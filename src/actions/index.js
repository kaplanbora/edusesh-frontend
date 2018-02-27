import Cookies from 'universal-cookie';
import {ERR_CLEAR, LOAD_TOKEN} from "./types";

export const clearError = errorName => ({
  type: ERR_CLEAR,
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