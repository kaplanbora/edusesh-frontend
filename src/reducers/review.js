import {CREATE_REVIEW, LOAD_REVIEW} from "../actions/types";

const initialState = null;

export const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_REVIEW:
      return action.payload.data ? action.payload.data : "";
    case CREATE_REVIEW:
      return {
        id: action.payload.id,
        rating: action.payload.review.rating,
        title: action.payload.review.title,
        comment: action.payload.review.comment
      };
    default:
      return state;
  }
};
