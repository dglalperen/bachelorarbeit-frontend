import { useState } from "react";

//TODO: When searching a per, loc or org, it should show a node if existing

const Search = ({ changeSearchText, searchText }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(searchText);
  };
  return (
    <div className="search">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchText}
          placeholder="Search for some Person, Organization or Country"
          onChange={(e) => {
            changeSearchText(e.target.value);
          }}
        />
        <button
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default Search;
