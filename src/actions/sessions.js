import {postWithTokenDispatch} from "./topics";

export const sessionRequest = (dispatch, values, token, id) => {
  const date = new Date(Date.parse(values.date));
  const data = {
    name: "name",
    description: values.description,
    instructorId: parseInt(id),
    topicId: parseInt(values.topic),
    date: date
  };
  console.log(data);
  return postWithTokenDispatch(dispatch, token, "/sessions", data);
};