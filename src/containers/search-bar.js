import React from "react";

const onSearch = (event, input) => {
  event.preventDefault();
  console.log(input.value);
  input.value = "";
};

const SearchBar = () => {
  let searchInput;
  return (
    <form onSubmit={(e) => onSearch(e, searchInput)}>
      <div className="input-group input-inline search-bar">
        <select className="form-select">
          <option>Topic</option>
          <option>Instructor</option>
        </select>
        <input className="form-input" placeholder="Find topics or instructors" ref={node => {
          searchInput = node
        }}/>
        <button className="btn btn-success input-group-btn">Search</button>
      </div>
    </form>
  );
};

export default SearchBar