import {API_URL, ERR_CLEAR, EDIT_CREDENTIALS, ERR_SUBMIT} from "./types";
import axios from "axios";

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
      payload: error.message === "Network Info" ? "Connection error." : "Info while changing credentials."
    })
  });
};
