import {LOAD_SESSION, SET_TARGET_READY, SET_USER_READY} from "../actions/types";

const initialValue = null;

export const sessionReducer = (state = initialValue, action) => {
  switch(action.type) {
    case LOAD_SESSION:
      return action.payload;
    case SET_USER_READY:
      return {
        id: state.id,
        name: state.name,
        description: state.description,
        traineeId: state.traineeId,
        instructorId: state.instructorId,
        date: state.date,
        topicId: state.topicId,
        isApproved: state.isApproved,
        isCompleted: state.isCompleted,
        isDeleted: state.isDeleted,
        isStarted: state.isStarted,
        userReady: true,
        targetReady: state.targetReady
      };
    case SET_TARGET_READY:
      return {
        id: state.id,
        name: state.name,
        description: state.description,
        traineeId: state.traineeId,
        instructorId: state.instructorId,
        date: state.date,
        topicId: state.topicId,
        isApproved: state.isApproved,
        isCompleted: state.isCompleted,
        isDeleted: state.isDeleted,
        isStarted: state.isStarted,
        userReady: state.userReady,
        targetReady: true
      };
    default:
      return state;
  }
};