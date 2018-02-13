import {LOGIN_SUCCESSFUL} from "./types";

export const loginRequest = credentials => {
  // Use credentials to send a login post request.
  // Put response body into token
  return {
    type: LOGIN_SUCCESSFUL,
    token: ""
  };
};
