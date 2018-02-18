import {API_URL, SUBMIT_ERROR} from "./types";
import axios from "axios";
import {SubmissionError} from 'redux-form';
import {SET_TOKEN, SET_TOKEN_NO_COOKIE} from "./types";

export const checkEmail = values => {
  return axios.post(`${API_URL}/users/email`, {
    email: values.email
  }).then(response => {
    if (response.data.emailExists) {
      throw {email: "This email address is taken."}
    }
  }).catch(e => console.log("Error at email check: " + e.message))
};

export const loginUser = (values, dispatch) => {
  const credentials = {
    email: values.email,
    password: values.password
  };

  return axios({
    method: "post",
    url: API_URL + "/users/login",
    data: credentials,
    validateStatus: null
  }).then(response => {
    dispatch({
      type: values.remember ? SET_TOKEN : SET_TOKEN_NO_COOKIE,
      payload: response.data.token
    })
  }).catch(error => {
    dispatch({
      type: SUBMIT_ERROR,
      payload: "Wrong email or password."
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
    .catch(e => console.log("Error at register: " + e.message));

  return {
    type: SET_TOKEN,
    payload: request
  };
};

export const registerTrainee = values => register(values, "trainee");

export const registerInstructor = values => register(values, "instructor");
