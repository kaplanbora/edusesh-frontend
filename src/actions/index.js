import {LOGIN_REQUEST, REGISTER_REQUEST} from "./types";

export const loginRequest = credentials => {
  // Use credentials to send a login post request.
  // Put response body into token
  return {
    type: LOGIN_REQUEST,
    token: ""
  };
};

export const registerRequest = credentials => {
  return {
    type: REGISTER_REQUEST,
    token: ""
  };
};
