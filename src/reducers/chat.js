import {LOAD_MESSAGES, RECEIVE_MESSAGE, SEND_MESSAGE} from "../actions/types";

const initialValue = [];

export const chatReducer = (state = initialValue, action) => {
  switch (action.type) {
    case LOAD_MESSAGES:
      return action.payload.data.reverse();
    case SEND_MESSAGE:
      const sent = {
        senderId: action.payload.senderId,
        body: action.payload.body
      };
      return [sent, ...state];
    case RECEIVE_MESSAGE:
      const received = {
        senderId: action.payload.senderId,
        body: action.payload.body
      };
      return [received, ...state];
    default:
      return state;
  }
};