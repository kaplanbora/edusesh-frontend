export const search = (dispatch, values, history) => {
  if (values.category === "Topic" || values.category === undefined) {
    history.push(`/search?category=topic&query=${values.query}`);
  } else {
    const query = values.query ? `&query=${values.query}` : "";
    console.log(values.query);
    history.push(`/search?category=instructor${query}`);
  }
};