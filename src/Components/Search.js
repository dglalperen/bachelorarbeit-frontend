const Search = ({
  searchbarText,
  changeSearchbarText,
  initialNodeAmount,
  handleInitialNodeAmount,
  jaccardThreshold,
  handleJaccardThreshold,
  handleEntityTypeSelection,
  isEntitySelected,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="search">
      <form onSubmit={handleSubmit}>
        <input
          className="textInput"
          type="text"
          value={searchbarText}
          placeholder="Search for some Person, Organization or Country"
          onChange={(e) => {
            changeSearchbarText(e.target.value);
          }}
        />
        <div className="radio">
          <label htmlFor="org" id="radioOrg">
            Organization
          </label>
          <input
            name="entity-type"
            checked={isEntitySelected("org")}
            onChange={(e) => handleEntityTypeSelection(e)}
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
            checked={isEntitySelected("loc")}
            onChange={(e) => handleEntityTypeSelection(e)}
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
            checked={isEntitySelected("per")}
            onChange={(e) => handleEntityTypeSelection(e)}
            type="radio"
            value="per"
          />
        </div>
        <div className="jaccardSlider">
          <label htmlFor="jaccardSlider">
            Jaccard Threshold: {jaccardThreshold}
          </label>
          <input
            type="range"
            name="jaccardSlider"
            min={0.1}
            max={1.0}
            step={0.1}
            value={jaccardThreshold}
            onChange={(e) => handleJaccardThreshold(e)}
          />
        </div>
        <div className="jaccardSlider">
          <label htmlFor="nodeAmount">Node Amount: {initialNodeAmount}</label>
          <input
            type="range"
            name="nodeAmount"
            min={10}
            max={300}
            step={10}
            value={initialNodeAmount}
            onChange={(e) => handleInitialNodeAmount(e)}
          />
        </div>
      </form>
    </div>
  );
};

export default Search;
