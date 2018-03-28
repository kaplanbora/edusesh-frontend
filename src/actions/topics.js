import {ADD_USER_TOPIC, API_URL, ERR_SESSION_REQUEST} from "./types";
import axios from "axios";

export const postWithToken = (token, route, data) => {
  return axios({
    method: "post",
    url: API_URL + route,
    headers: {"JWT": token},
    data: data
  }).then(response => {
    if (!(response.status !== 201 || response.status !== 200)) {
      throw new Error("Error at post with token.")
    }
    return response
  }).catch(error => console.log(error));
};

export const postWithTokenDispatch = (dispatch, token, route, data) => {
  return axios({
    method: "post",
    url: API_URL + route,
    headers: {"JWT": token},
    data: data
  }).catch(error => {
    dispatch({
      type: ERR_SESSION_REQUEST,
      payload: error.message
    })
  });
};

export const deleteWithToken = (token, route) => {
  return axios({
    method: "delete",
    url: API_URL + route,
    headers: {"JWT": token},
  })
};

export const addUserTopic = (values, token, dispatch) => {
  const userTopic = {
    name: values.name,
    parentId: parseInt(values.parentId)
  };
  return postWithToken(token, "/users/topics", userTopic)
    .then(response => {
      dispatch({
          type: ADD_USER_TOPIC,
          payload: {
            id: response.data.id,
            name: values.name,
            parentId: parseInt(values.parentId)
          }
        })
      }
    )
};

