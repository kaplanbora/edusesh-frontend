import {API_URL, ERR_CLEAR, EDIT_CREDENTIALS, ERR_SUBMIT} from "./types";
import axios from "axios";
import {SubmissionError} from 'redux-form';

export const saveCredentials = (credentials, token, dispatch) => {
  dispatch({
    type: ERR_CLEAR,
    payload: "submit"
  });

  return axios({
    method: "put",
    url: API_URL + "/users/credentials",
    data: credentials,
    headers: {JWT: token}
  }).then(response => {
    dispatch({
      type: EDIT_CREDENTIALS,
      payload: response.data
    })
  }).catch(error => {
    dispatch({
      type: ERR_SUBMIT,
      payload: error.message === "Network Error" ? "Connection error." : "Error while changing credentials."
    })
  });
};

const postTraineeProfile = (image, values, token) => {
  return axios.put(API_URL + "/users/profile", {
    firstName: values.firstName,
    lastName: values.lastName,
    imageLink: image.secure_url
  }, {headers: {"JWT": token}})
};

const uploadImage = (image, token, dispatch) => {
  const url = "https://api.cloudinary.com/v1_1/edusesh/image/upload";
  const form = new FormData();
  form.append("image", values.photo);
  axios.post(url, form, {
    headers: {"Content-Type": "multipart/form-data"}
  }).then(response => {
    if (response.status !== 200) {
      throw new SubmissionError({
        _error: "Something went wrong on user creation.",
      });
    }
    console.log(response);
    return response.data;
  }).then(image => postTraineeProfile(image, values))
    .catch(error =>
      dispatch({
        type: ERR_SUBMIT,
        payload: error.message === "Network Error" ? "Connection error." : "Error while changing credentials."
      })
    )
};

export const saveTraineeProfile = (values, token, dispatch) => {
  return axios.put(API_URL + "/users/profile", {
    firstName: values.firstName,
    lastName: values.lastName
  }, {headers: {"JWT": token}})
};

export const saveInstructorProfile = (values, token, dispatch) => {
  return axios.put(API_URL + "/users/profile", {
    firstName: values.firstName,
    lastName: values.lastName,
    occupation: values.occupation,
    hourlyRate: parseFloat(values.hourlyRate),
    description: values.description
  }, {headers: {"JWT": token}})
    .catch(error => console.log(error))
};
