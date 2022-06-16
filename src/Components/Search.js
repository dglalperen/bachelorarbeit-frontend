//TODO: When searching a per, loc or org, it should show a node if existing

const Search = ({
  changeSearchText,
  searchText,
  handleRadioClick,
  isSelected,
  handleSlider,
  sliderValue,
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
        <div className="jaccardSlider">
          <label htmlFor="jaccardSlider">
            Jaccard Threshold: {sliderValue}
          </label>
          <input
            type="range"
            name="jaccardSlider"
            min={0.0}
            max={1.0}
            step={0.1}
            id="jaccardSlider"
            value={sliderValue}
            onChange={(e) => handleSlider(e)}
          />
        </div>
      </form>
    </div>
  );
};

export default Search;
