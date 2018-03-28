import Cookies from 'universal-cookie';
import {ERR_CLEAR, LOAD_TOKEN} from "./types";

export const clearError = () => ({
  type: ERR_CLEAR
});

export const tokenFromCookie = () => {
  const cookie = new Cookies();
  const token = cookie.get("token");
  return {
    type: LOAD_TOKEN,
    payload: token ? token : null
  }
};