import {deleteWithToken, postWithTokenDispatch, putWithToken} from "./topics";
import {APPROVE_SESION, LOAD_SESSION, REMOVE_SESSION} from "./types";
import {getWithToken} from "./load";

export const loadSession = (dispatch, token, id) => {
  const response = getWithToken(token, "/sessions/" + id)
    .then(response => response.data);
  return dispatch({
    type: LOAD_SESSION,
    payload: response
  })
};

export const sessionRequest = (dispatch, values, token, id) => {
  const date = new Date(Date.parse(values.date));
  const data = {
    name: values.name,
    description: values.description,
    instructorId: parseInt(id),
    topicId: parseInt(values.topic),
    date: date
  };
  return postWithTokenDispatch(dispatch, token, "/sessions", data);
};

export const removeSession = (dispatch, id, token) => {
  deleteWithToken(token, "/sessions/" + id);

  return dispatch({
    type: REMOVE_SESSION,
    payload: id
  })
};

export const approveSession = (dispatch, id, token) => {
  putWithToken(token, "/sessions/" + id, {
    isApproved: true,
    isCompleted: false
  });

  return dispatch({
    type: APPROVE_SESION,
    payload: id
  })
};