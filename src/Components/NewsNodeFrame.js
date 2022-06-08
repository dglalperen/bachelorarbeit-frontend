import ForceGraph2D from "react-force-graph-2d";
import { useCallback, useEffect, useRef, useState } from "react";
import useFetchSearch from "../CustomHooks/useFetchSearch";
import Search from "./Search";
import { pushNewsNode, pushNodes } from "../Helpers/nodeAdders";
import { pushLinks } from "../Helpers/linkAdders";

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

  useEffect(() => {
    if (newsData) {
      const nodes = [];
      const links = [];
      const allIDs = [];
      newsData.forEach((news) => {
        /* nodes.push({
          id: news.id,
          name: news.headline,
          __typename: news.__typename,
          color: "black",
          sizeInPx: 6,
        }); */

        pushNewsNode(nodes, news);

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

  const handleClick = useCallback(
    (nodeArr) => {
      const nodes = [];
      const links = [];

      const node = nodeArr[0];

      if (node.__typename === "News") {
        console.log("clicked");
        pushNewsNode(nodes, node);

        node.org.forEach((orgNode) => {
          if (orgNode.sameAs) {
            pushNodes(nodes, orgNode, "org", "green");
            pushLinks(links, node, orgNode);
          }
        });

        node.per.forEach((perNode) => {
          if (perNode.sameAs) {
            pushNodes(nodes, perNode, "per", "red");
            pushLinks(links, node, perNode);
          }
        });

        node.loc.forEach((locNode) => {
          function pushAndSetNodes(cb) {
            pushNodes(nodes, locNode, "loc", "blue");
            pushLinks(links, node, locNode);
          }
          if (locNode.sameAs) {
            pushAndSetNodes(() => setNodes({ nodes: nodes, links: links }));
          }
        });
      }
    },
    [nodes]
  );

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
          linkDirectionalParticles={5}
          graphData={nodes}
          onNodeClick={(node, event) =>
            handleClick(newsData.filter((news) => news.id === node.id))
          }
        />
      )}
    </div>
  );
};

export default NewsNodeFrame;
