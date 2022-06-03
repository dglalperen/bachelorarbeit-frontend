import ForceGraph2D from "react-force-graph-2d";
import { useEffect, useState } from "react";
import useFetchSearch from "../CustomHooks/useFetchSearch";
import Search from "./Search";

const NewsNodeFrame = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedEntityType, setSelectedEntityType] = useState("org");

  const isSelected = (value) => {
    return isSelected === value;
  };

  const handleRadioClick = (e) => {
    setSelectedEntityType(e.target.value);
  };

  const {
    data: newsData,
    isLoading: isLoadingNewsData,
    error: errorNewsData,
  } = useFetchSearch("http://195.37.233.209:4000/graphql", "org", searchText);

  const [nodes, setNodes] = useState({
    nodes: [],
    links: [],
  });

  return (
    <div>
      <Search
        searchText={searchText}
        changeSearchText={(text) => setSearchText(text)}
        isSelected={isSelected}
        selectedEntityType={selectedEntityType}
        handleRadioClick={handleRadioClick}
      />
      {isLoadingNewsData && !errorNewsData && <p>Loading...</p>}
      {!isLoadingNewsData && (
        <ForceGraph2D
          height={800}
          width={1000}
          backgroundColor="#fdf7fa"
          nodeColor={"color"}
          nodeLabel={"name"}
          nodeVal={"sizeInPx"}
          linkColor={"black"}
          linkWidth={4}
          linkDirectionalParticles={5}
          graphData={nodes}
        />
      )}
    </div>
  );
};

export default NewsNodeFrame;
