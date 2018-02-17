import {API_URL} from "./types";
import axios from "axios";
import {SubmissionError} from 'redux-form';
import {SET_TOKEN} from "./types";

export const checkEmail = values => {
  return axios.post(`${API_URL}/users/email`, {
    email: values.email
  }).then(response => {
    if (response.data.emailExists) {
      throw {email: "This email address is taken."}
    }
  }).catch(e => console.log("Error at email check: " + e.message))
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
