import Cookies from 'universal-cookie';
import {LOAD_TOKEN} from "./types";

export const tokenFromCookie = () => {
  const cookie = new Cookies();
  const token = cookie.get("token");
  return {
    type: LOAD_TOKEN,
    payload: token ? token : null
  }
};