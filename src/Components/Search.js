import { useState } from "react";

//TODO: When searching a per, loc or org, it should show a node if existing

const Search = ({ text, changeSearchText }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const search = { searchText };
  };
  const [searchText, setSearchText] = useState("");

  return (
    <div className="search">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchText}
          placeholder="Search for some Person, Organization or Country"
          onChange={(e) => {
            setSearchText(e.target.value);
            changeSearchText(e.target.value);
          }}
        />
        <button
          onClick={() => {
            console.log(searchText);
          }}
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default Search;
