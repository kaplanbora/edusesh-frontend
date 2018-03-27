import axios from "axios";
import {
  API_URL, LOAD_CREDENTIALS, LOAD_MAIN_TOPICS, LOAD_PROFILE, LOAD_SELF_TOPICS, LOAD_TARGET_CREDENTIALS,
  LOAD_TARGET_PROFILE,
  LOAD_TARGET_TOPICS,
} from "./types";

export const getTargetTopics = userId => ({
  type: LOAD_TARGET_TOPICS,
  payload: getWithoutToken(`/users/${userId}/topics`)
});

export const getTargetCredentials = userId => ({
  type: LOAD_TARGET_CREDENTIALS,
  payload: getWithoutToken(`/users/${userId}/credentials`)
});

export const getTargetProfile = userId => ({
  type: LOAD_TARGET_PROFILE,
  payload: getWithoutToken(`/users/${userId}/profile`)
});

export const getMainTopics = () => ({
  type: LOAD_MAIN_TOPICS,
  payload: getWithoutToken("/topics?t=main")
});

export const getSelfTopics = token => ({
  type: LOAD_SELF_TOPICS,
  payload: getWithToken(token, "/users/topics")
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
