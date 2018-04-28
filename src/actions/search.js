import {FILTER_RESULTS, LOAD_RESULTS} from "./types";
import {getWithoutToken} from "./load";

export const filter = (values, url) => ({
  type: FILTER_RESULTS,
  payload: getWithoutToken("/users" + url).then(response => {
    response.filters = values;
    return response;
  })
});

export const search = (dispatch, values, history) => {
  const category = values.category === "instructor" ? "instructor" : "topic";
  const query = values.query ? `&query=${values.query}` : "";
  const searchUrl = `/search?category=${category}${query}`;
  history.push(searchUrl);
  loadResults(dispatch, searchUrl);
};

export const searchByUrl = (dispatch, url) =>
  loadResults(dispatch, url);

const loadResults = (dispatch, searchUrl) =>
  dispatch({
    type: LOAD_RESULTS,
    payload: getWithoutToken("/users" + searchUrl)
  });
