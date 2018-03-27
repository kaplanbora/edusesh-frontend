import {
  AUTH_LOGOUT, LOAD_PROFILE, LOAD_CREDENTIALS, LOAD_USER_TOPICS, ADD_USER_TOPIC,
  LOAD_SELF_TOPICS, REMOVE_USER_TOPIC
} from "../actions/types";

const initialState = {
  profile: {},
  credentials: {},
  topics: []
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_LOGOUT:
      return initialState;

    case LOAD_CREDENTIALS:
      const credentials = action.payload.data;
      return {
        profile: state.profile,
        credentials,
        topics: state.topics
      };

    case LOAD_PROFILE:
      const profile = action.payload.data;
      return {
        profile,
        credentials: state.credentials,
        topics: state.topics
      };

    case LOAD_USER_TOPICS:
      return {
        profile: state.profile,
        credentials: state.credentials,
        topics: action.payload.data
      };

    case ADD_USER_TOPIC:
      return {
        profile: state.profile,
        credentials: state.credentials,
        topics: [...state.topics, action.payload]
      };

    case LOAD_SELF_TOPICS:
      return {
        profile: state.profile,
        credentials: state.credentials,
        topics: action.payload.data
      };

    case REMOVE_USER_TOPIC:
      return {
        profile: state.profile,
        credentials: state.credentials,
        topics: state.topics.filter(topic => topic.id != action.payload)
      };

    default:
      return state;
  }
};

export default userReducer
