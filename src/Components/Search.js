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
          <label htmlFor="org" id="radioOrg">
            Organization
          </label>
          <input
            name="entity-type"
            checked={isSelected("org")}
            onChange={(e) => handleRadioClick(e)}
            type="radio"
            value="org"
          />
        </div>
        <div className="radio">
          <label htmlFor="loc" id="radioLoc">
            Location
          </label>
          <input
            name="entity-type"
            checked={isSelected("loc")}
            onChange={(e) => handleRadioClick(e)}
            type="radio"
            value="loc"
          />
        </div>
        <div className="radio">
          <label htmlFor="per" id="radioPer">
            Person
          </label>
          <input
            name="entity-type"
            checked={isSelected("per")}
            onChange={(e) => handleRadioClick(e)}
            type="radio"
            value="per"
          />
        </div>

        {/* <button
          disabled
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          Search
        </button> */}
      </form>
    </div>
  );
};

export default Search;
