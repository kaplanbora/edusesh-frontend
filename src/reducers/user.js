import {
  AUTH_LOGOUT, LOAD_PROFILE, LOAD_CREDENTIALS, LOAD_USER_TOPICS, ADD_USER_TOPIC,
  LOAD_SELF_TOPICS, REMOVE_USER_TOPIC, LOAD_SELF_SESSIONS
} from "../actions/types";

const initialState = {
  profile: {},
  credentials: {},
  topics: [],
  sessions: []
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_LOGOUT:
      return initialState;

    case LOAD_CREDENTIALS:
      return {
        profile: state.profile,
        credentials: action.payload.data,
        topics: state.topics,
        sessions: state.sessions
      };

    case LOAD_PROFILE:
      return {
        profile: action.payload.data,
        credentials: state.credentials,
        topics: state.topics,
        sessions: state.sessions
      };

    case LOAD_USER_TOPICS:
      return {
        profile: state.profile,
        credentials: state.credentials,
        topics: action.payload.data,
        sessions: state.sessions
      };

    case ADD_USER_TOPIC:
      return {
        profile: state.profile,
        credentials: state.credentials,
        topics: [...state.topics, action.payload],
        sessions: state.sessions
      };

    case LOAD_SELF_TOPICS:
      return {
        profile: state.profile,
        credentials: state.credentials,
        topics: action.payload.data,
        sessions: state.sessions
      };

    case REMOVE_USER_TOPIC:
      return {
        profile: state.profile,
        credentials: state.credentials,
        topics: state.topics.filter(topic => topic.id != action.payload),
        sessions: state.sessions
      };

    case LOAD_SELF_SESSIONS:
      return {
        profile: state.profile,
        credentials: state.credentials,
        topics: state.topics,
        sessions: action.payload.data
      };

    default:
      return state;
  }
};

export default userReducer
