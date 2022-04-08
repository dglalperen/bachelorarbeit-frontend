import { useState } from "react";

const News = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
    const search = { searchText };
  };
  const [searchText, setSearchText] = useState("");

  return (
    <div className="news">

      <div className="categories">
        <h2><span id="per">Person </span><span id="loc">Location </span><span id="org">Organization </span><span id="news">News</span></h2>
      </div>

      <form onSubmit={handleSubmit}>
        <label>
          Search for Person, Organization or Country
        </label>
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button>Search</button>
      </form>
    </div>
  );
};

export default News;
