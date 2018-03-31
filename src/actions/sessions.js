import {deleteWithToken, postWithTokenDispatch, putWithToken} from "./topics";
import {APPROVE_SESION, REMOVE_SESSION} from "./types";

export const sessionRequest = (dispatch, values, token, id) => {
  const date = new Date(Date.parse(values.date));
  const data = {
    name: "name",
    description: values.description,
    instructorId: parseInt(id),
    topicId: parseInt(values.topic),
    date: date
  };
  console.log(data);
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