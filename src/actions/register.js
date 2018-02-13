const API_URL = "http://localhost:9000";
import axios from "axios";
import {SubmissionError} from 'redux-form';
import {LOGIN_SUCCESSFUL} from "./types";

export const checkEmail = values => {
  return axios.post(`${API_URL}/users/email`, {
    email: values.email
  }).then(response => {
    if (response.data["email-exists"]) {
      throw {email: "This email address is taken."}
    }
  })
};

const login = credentials => {
  return axios.post(`${API_URL}/users/login`, {
    email: values.email,
    password: values.password
  }).then(response => {
    return {
      token: response.data.token
    }
  });
};

export const register = values => {
  const credentials = {
    email: values.email,
    password: values.password
  };

  // Make this return token. Change controller result.
  const request = axios.post(`${API_URL}/users/register?role=trainee`, credentials)
    .then(response => {
      if (!response.data.id) {
        throw new SubmissionError({
          _error: "Something went wrong.",
        });
      }
    });

  return {
    type: LOGIN_SUCCESSFUL,
    user: request
  };
};