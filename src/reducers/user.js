import {AUTH_LOGOUT, LOAD_PROFILE, LOAD_CREDENTIALS} from "../actions/types";

const initialState = {
  profile: {},
  credentials: {}
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_LOGOUT:
      return initialState;

    case LOAD_CREDENTIALS:
      const credentials = action.payload.data;
      return {
        profile: state.profile,
        credentials
      };

    case LOAD_PROFILE:
      const profile = action.payload.data;
      return {
        profile,
        credentials: state.credentials
      };

    default:
      return state;
  }
};

export default userReducer
