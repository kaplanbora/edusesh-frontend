import {LOAD_TARGET_CREDENTIALS, LOAD_TARGET_PROFILE, LOAD_TARGET_TOPICS} from "../actions/types";

const initialState = {
  profile: {},
  credentials: {},
  topics: []
};

const targetUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_TARGET_CREDENTIALS:
      return {
        profile: state.profile,
        credentials: action.payload.data,
        topics: state.topics
      };

    case LOAD_TARGET_PROFILE:
      return {
        profile: action.payload.data,
        credentials: state.credentials,
        topics: state.topics
      };

    case LOAD_TARGET_TOPICS:
      return {
        profile: state.profile,
        credentials: state.credentials,
        topics: action.payload.data
      };

    default:
      return state;
  }
};

export default targetUserReducer
