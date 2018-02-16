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
        <input className="form-input" placeholder="Find instructors" ref={node => {
          searchInput = node
        }}/>
        <button className="btn btn-primary input-group-btn">Search</button>
      </div>
    </form>
  );
};

export default SearchBar