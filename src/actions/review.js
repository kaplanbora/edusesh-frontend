import {getWithoutToken, getWithToken} from "./load";
import {CREATE_REVIEW, LOAD_REVIEW} from "./types";
import {postWithToken, putWithToken} from "./topics";

export const loadReview = (token, sessionId) => ({
  type: LOAD_REVIEW,
  payload: getWithToken(token, `/sessions/${sessionId}/reviews`)
});

export const loadReviews = instructorId => ({
  type: LOAD_REVIEW,
  payload: getWithoutToken(`/users/${instructorId}/reviews`)
});

export const createReview = (token, sessionId, existingReview, values) => {
  const review = {
    rating: parseInt(values.rating),
    title: values.title,
    comment: values.comment
  };

  const id = existingReview
    ? putWithToken(token, `/sessions/${sessionId}/reviews`, review)
    : postWithToken(token, `/sessions/${sessionId}/reviews`, review);

  return {
    type: CREATE_REVIEW,
    payload: {id, review}
  }
};