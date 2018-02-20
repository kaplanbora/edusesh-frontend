import axios from "axios";
import {API_URL, LOAD_CREDENTIALS, LOAD_PROFILE, LOGOUT} from "./types";

export const logout = () => ({
  type: LOGOUT
});

export const getCredentials = token => ({
  type: LOAD_CREDENTIALS,
  payload: getWithToken(token, "/users/credentials")
});

export const getProfile = token => ({
  type: LOAD_PROFILE,
  payload: getWithToken(token, "/users/profile")
});

const getWithToken = (token, route) => {
  return axios({
    method: "get",
    url: API_URL + route,
    headers: {"JWT": token}
  }).then(response => {
    if (response.status !== 200) {
      throw new Error("Error at get with token.")
    }
    return response
  }).catch(error => console.log(error.message));
};