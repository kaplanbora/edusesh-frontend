import {API_URL, ERR_LOGIN, AUTH_LOGOUT, AUTH_SET_TOKEN, AUTH_SET_TOKEN_NO_COOKIE, ERR_CLEAR} from "./types";
import axios from "axios";
import {SubmissionError} from 'redux-form';

export const logout = () => ({
  type: AUTH_LOGOUT
});

export const checkEmail = values => {
  return axios.post(`${API_URL}/users/email`, {
    email: values.email
  }).then(response => {
    if (response.data.emailExists) {
      throw {email: "This email address is taken."}
    }
  })
};

export const loginUser = (values, dispatch) => {
  dispatch({
    type: ERR_CLEAR
  });

  const credentials = {
    email: values.email,
    password: values.password
  };

  return axios({
    method: "post",
    url: API_URL + "/users/login",
    data: credentials
  }).then(response => {
    dispatch({
      type: values.remember ? AUTH_SET_TOKEN : AUTH_SET_TOKEN_NO_COOKIE,
      payload: response.data.token
    })
  }).catch(error => {
    dispatch({
      type: ERR_LOGIN,
      payload: error.message === "Network Info" ? "Connection error." : "Wrong email or password."
    })
  });
};

const register = (values, role) => {
  const credentials = {
    email: values.email,
    password: values.password
  };

  const request = axios.post(`${API_URL}/users/register?role=${role}`, credentials)
    .then(response => {
      if (response.status !== 201) {
        throw new SubmissionError({
          _error: "Something went wrong on user creation.",
        });
      }
      return response.data.token;
    })
    .catch(e => console.log("Info at register: " + e.message));

  return {
    type: AUTH_SET_TOKEN,
    payload: request
  };
};

export const registerTrainee = values => register(values, "trainee");

export const registerInstructor = values => register(values, "instructor");
