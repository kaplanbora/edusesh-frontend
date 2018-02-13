const API_URL = "http://localhost:9000";
import axios from "axios";

export const checkEmail = values => {
  return axios.post(`${API_URL}/users/email`, {
    email: values.email
  }).then(response => {
    if (response.data["email-exists"]) {
      throw {email: "This email address is taken."}
    }
  })
};