import { useState } from "react";

//TODO: When searching a per, loc or org, it should show a node if existing

const Search = ({
  changeSearchText,
  searchText,
  selectedEntityType,
  handleRadioClick,
  isSelected,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(searchText);
  };
  return (
    <div className="search">
      <form onSubmit={handleSubmit}>
        <input
          className="textInput"
          type="text"
          value={searchText}
          placeholder="Search for some Person, Organization or Country"
          onChange={(e) => {
            changeSearchText(e.target.value);
          }}
        />
        <div className="radio">
          <label htmlFor="org">Organization</label>
          <input
            checked={isSelected("org")}
            onChange={(e) => handleRadioClick(e)}
            type="radio"
            value="org"
          />
        </div>
        <div className="radio">
          <label htmlFor="loc">Location</label>
          <input
            checked={isSelected("loc")}
            onChange={(e) => handleRadioClick(e)}
            type="radio"
            value="loc"
          />
        </div>
        <div className="radio">
          <label htmlFor="per">Person</label>
          <input
            checked={isSelected("per")}
            onChange={(e) => handleRadioClick(e)}
            type="radio"
            value="per"
          />
        </div>

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
