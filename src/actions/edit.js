import {API_URL, ERR_CLEAR, EDIT_CREDENTIALS, ERR_SUBMIT} from "./types";
import axios from "axios";

export const saveCredentials = (credentials, token, dispatch) => {
  // console.log(dispatch);
  // console.log(token);
  // console.log(credentials);
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
