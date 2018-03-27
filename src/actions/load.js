import axios from "axios";
import {API_URL, LOAD_CREDENTIALS, LOAD_MAIN_TOPICS, LOAD_PROFILE, LOAD_USER_TOPICS} from "./types";

export const getMainTopics = () => ({
  type: LOAD_MAIN_TOPICS,
  payload: getWithoutToken("/topics?t=main")
});

export const getUsersTopics = userId => ({
  type: LOAD_USER_TOPICS,
  payload: getWithoutToken(`/users/${userId}/topics`)
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
      throw new Error("Info at get with token.")
    }
    return response
  }).catch(error => console.log(error.message));
};

const getWithoutToken = (route) => {
  return axios({
    method: "get",
    url: API_URL + route
  }).then(response => {
    if (response.status !== 200) {
      throw new Error("Info at get without token.")
    }
    return response
  }).catch(error => console.log(error.message));
};
