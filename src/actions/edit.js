import {API_URL, ERR_CLEAR, EDIT_CREDENTIALS, ERR_SUBMIT} from "./types";
import axios from "axios";
import {SubmissionError} from 'redux-form';

export const saveCredentials = (credentials, props, dispatch) => {
  dispatch({
    type: ERR_CLEAR,
    payload: "submit"
  });

  return axios({
    method: "put",
    url: API_URL + "/users/credentials",
    data: credentials,
    headers: {JWT: props.token}
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

const postTraineeProfile = (image, values) => {
  return axios.put(API_URL + "/users/profile", {
    firstName: values.firstName,
    lastName: values.lastName,
    imageLink: image.secure_url
  })
};

export const saveTraineeProfile = (values, dispatch) => {
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
    return response.data;
  }).then(image => postTraineeProfile(image, values))
    .catch(error =>
      dispatch({
        type: ERR_SUBMIT,
        payload: error.message === "Network Error" ? "Connection error." : "Error while changing credentials."
      })
    )
};
