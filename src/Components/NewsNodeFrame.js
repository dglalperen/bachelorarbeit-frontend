import ForceGraph2D from "react-force-graph-2d";
import { useEffect, useState } from "react";
import useFetchSearch from "../CustomHooks/useFetchSearch";
import Search from "./Search";
import createMainNode from "../Helpers/createMainNode";

const NewsNodeFrame = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedEntityType, setSelectedEntityType] = useState("org");

  const isSelected = (value) => {
    if (selectedEntityType === value) {
      return true;
    } else return false;
  };

  const handleRadioClick = (e) => {
    setSelectedEntityType(e.target.value);
    console.log(e.target.value);
  };

  const {
    data: newsData,
    isLoading: isLoadingNewsData,
    error: errorNewsData,
  } = useFetchSearch(
    "http://195.37.233.209:4000/graphql",
    selectedEntityType,
    searchText
  );

  const [nodes, setNodes] = useState({
    nodes: [],
    links: [],
  });

  const setStateCB = (newState) => {
    setNodes(newState);
  };

  useEffect(() => {
    if (newsData) {
      const nodes = [];
      const links = [];
      const allIDs = [];
      newsData.forEach((news) => {
        nodes.push({
          id: news.id,
          name: news.headline,
          __typename: news.__typename,
          color: "purple",
          sizeInPx: 6,
        });

        allIDs.push(news.id);

        links.push({
          source: news.id,
          target: allIDs[Math.floor(Math.random() * allIDs.length)],
        });

        setNodes({ nodes: nodes, links: links });
      });
    }
  }, [newsData]);

  useEffect(() => {
    console.clear();
    console.log(nodes);
  }, [nodes]);

  const focusHandler = (nodeArr) => {
    const nodes = [];
    const links = [];

    const node = nodeArr[0];

    if (node.org) {
      console.log(node);
      nodes.push({
        id: node.id,
        name: node.headline,
        __typename: node.__typename,
        color: "purple",
        sizeInPx: 6,
      });

      node.org.forEach((orgNode) => {
        //! Checking if org has a Qid
        //! If not, it wont be considered and rendered
        if (orgNode.sameAs) {
          nodes.push({
            id: orgNode.sameAs,
            name: orgNode.name,
            __typename: "org",
            color: "orange",
            sizeInPx: 5,
          });

          links.push({
            source: node.id,
            target: orgNode.sameAs,
          });

          setNodes({ nodes: nodes, links: links });
        }
      });
    }
  };

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
          onNodeClick={(node, event) =>
            focusHandler(newsData.filter((news) => news.id === node.id))
          }
        />
      )}
    </div>
  );
};

export default NewsNodeFrame;
