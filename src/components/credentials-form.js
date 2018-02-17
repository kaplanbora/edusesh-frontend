import React from "react";
import {Field} from "redux-form";
import UserInput from "../components/user-input"

export const CredentialsForm = () => {
  return (
    <div>
      <Field
        label="Email"
        name="email"
        placeholder="Your email address"
        component={UserInput}
      />
      <Field
        label="Password"
        name="password"
        placeholder="Your password"
        component={UserInput}
      />
    </div>
  )
};

