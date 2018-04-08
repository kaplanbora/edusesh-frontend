import {LOCAL_STREAM_RECEIVED, REMOTE_STREAM_RECEIVED} from "../actions/types";

const initialValues = {
  local: null,
  remote: null
};

export const streamReducer = (state = initialValues, action) => {
  switch (action.type) {
    case LOCAL_STREAM_RECEIVED:
      return {
        local: action.payload,
        remote: state.remote
      };
    case REMOTE_STREAM_RECEIVED:
      return {
        local: state.local,
        remote: action.payload
      };
    default:
      return state;
  }
};