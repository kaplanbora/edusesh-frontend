import {getWithToken} from "./load";
import {CREATE_REVIEW, LOAD_REVIEW} from "./types";
import {postWithToken} from "./topics";

export const loadReview = (token, sessionId) => ({
  type: LOAD_REVIEW,
  payload: getWithToken(token, `/sessions/${sessionId}/reviews`)
});

export const createReview = (token, sessionId, values) => {
  const review = {
    rating: values.rating,
    title: values.title,
    comment: values.comment
  };

  const id = postWithToken(token, `/sessions/${sessionId}/reviews`, review);

  return {
    type: CREATE_REVIEW,
    payload: {id, review}
  }
};