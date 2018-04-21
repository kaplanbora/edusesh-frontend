import {deleteWithToken, postWithTokenDispatch, putWithToken} from "./topics";
import {
  APPROVE_SESION,
  LOAD_MESSAGES,
  LOAD_SESSION, RECEIVE_MESSAGE,
  REMOVE_SESSION, SEND_MESSAGE,
  SET_TARGET_READY,
  SET_USER_READY,
  START_SESSION
} from "./types";
import {getWithToken} from "./load";
import {sendToServer} from "./signal";
import {reset} from "redux-form";

export const loadSession = (token, id) => {
  const response = getWithToken(token, "/sessions/" + id)
    .then(response => response.data);
  return {
    type: LOAD_SESSION,
    payload: response
  };
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

export const startSession = (id, token) => {
  putWithToken(token, "/sessions/" + id, {
    isApproved: true,
    isCompleted: false,
    isStarted: true
  });
};

export const approveSession = (dispatch, id, token) => {
  putWithToken(token, "/sessions/" + id, {
    isApproved: true,
    isCompleted: false,
    isStarted: false
  });

  return dispatch({
    type: APPROVE_SESION,
    payload: id
  })
};

export const sessionReady = (dispatch, user, session, startDate, token) => {
  if (user.role === "instructor") {
    startSession(session.id, token)
  }
  dispatch({
    type: START_SESSION,
    payload: startDate
  });
};

export const onUserReady = (dispatch, user) => {
  sendToServer({
    type: "user_ready",
    payload: user.id
  });
  dispatch({type: SET_USER_READY})
};

export const onTargetReady = dispatch => {
  dispatch({type: SET_TARGET_READY})
};

export const initiateConnection = (user, session) => {
  sendToServer({
    type: "initiate",
    payload: {
      session: session.id,
      owner: user.id,
      role: user.role,
      target: user.role === "instructor" ?
        session.traineeId :
        session.instructorId
    }
  });
};

export const sendMessage = (dispatch, token, message, sessionId, userId) => {
  postWithTokenDispatch(dispatch, token, `/chats/${sessionId}/messages`, {
    body: message
  });

  const payload = {
    senderId: userId,
    body: message
  };

  sendToServer({
    type: "chat-message",
    payload
  });

  dispatch({
    type: SEND_MESSAGE,
    payload
  });

  dispatch(reset("chatForm"));
};

export const receiveMessage = message => {
  return {
    type: RECEIVE_MESSAGE,
    payload: message
  }
};

export const loadMessages = (token, sesssionId) => ({
  type: LOAD_MESSAGES,
  payload: getWithToken(token, `/chats/${sesssionId}/messages`)
});