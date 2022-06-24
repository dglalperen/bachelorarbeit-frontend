import ForceGraph2D from "react-force-graph-2d";
import Search from "./Search";
import { useCallback, useEffect, useState } from "react";
import useFetchSearch from "../CustomHooks/useFetchSearch";
import useFetchEntity from "../CustomHooks/useFetchEntity";
import {
  pushEntityMainNode,
  pushEntityNode,
  pushNewsNode,
  pushNodes,
} from "../Helper Functions/nodeAdders";
import {
  pushLinks,
  pushEntityLinks,
  pushNewsLink,
} from "../Helper Functions/linkAdders";
import { getJaccardIndexOf } from "../Helper Functions/getJaccardIndexOf";
import { click } from "@testing-library/user-event/dist/click";

const NewsNodeFrame = () => {
  //* States

  const [searchbarText, setSearchbarText] = useState("Elon Musk");
  const [selectedEntityType, setSelectedEntityType] = useState("per");
  const [currentEntityType, setCurrentEntityType] = useState(null);
  const [currentEntityQid, setCurrentEntityQid] = useState(null);
  const [clickedNode, setClickedNode] = useState(null);
  const [jaccardThreshold, setJaccardThreshold] = useState(0.6);
  const [initialNodeAmount, setInitialNodeAmount] = useState(102);
  const [nodes, setNodes] = useState({
    nodes: [],
    links: [],
  });

  const {
    data: newsData,
    isLoading: isLoadingNewsData,
    error: errorNewsData,
  } = useFetchSearch(
    "http://195.37.233.209:4000/graphql",
    selectedEntityType,
    searchbarText,
    initialNodeAmount
  );

  const {
    data: entityData,
    isLoading: isLoadingEntityData,
    error: errorEntityData,
  } = useFetchEntity(
    "http://195.37.233.209:4000/graphql",
    currentEntityType,
    currentEntityQid
  );

  const isEntitySelected = (value) => {
    if (selectedEntityType === value) {
      return true;
    } else return false;
  };

  const handleEntityTypeSelection = (e) => {
    setSelectedEntityType(e.target.value);
  };

  const handleJaccardThreshold = (e) => {
    setJaccardThreshold(e.target.value);
  };

  const handleInitialNodeAmount = (e) => {
    setInitialNodeAmount(e.target.value);
  };

  //! Initial Link Setting
  useEffect(() => {
    if (newsData) {
      const nodes = [];
      const links = [];
      newsData.forEach((news) => {
        pushNewsNode(nodes, news);

        newsData.forEach((comparisonNews) => {
          if (news !== comparisonNews) {
            let jacPer = getJaccardIndexOf(news.per, comparisonNews.per);
            let jacOrg = getJaccardIndexOf(news.org, comparisonNews.org);
            let jacLoc = getJaccardIndexOf(news.loc, comparisonNews.loc);
            let jaccardIndex = (jacOrg + jacPer + jacLoc) / 3;

            if (jaccardIndex >= jaccardThreshold) {
              pushNewsLink(links, news, comparisonNews);
            }
          }
        });
      });
      setNodes({ nodes: nodes, links: links });
    }
  }, [newsData, jaccardThreshold]);

  /*  useEffect(() => {
    console.clear();
    console.log(nodes);
  }, [nodes]); */

  //! When Child Node is clicked, the entityData changes
  //! Causing the view to update
  useEffect(() => {
    if (entityData) {
      const nodes = [];
      const links = [];

      if (clickedNode?.__typename === "org") {
        pushEntityMainNode(nodes, entityData, clickedNode?.__typename, "green");
        entityData?.country?.forEach((loc) => {
          pushEntityNode(nodes, loc, "loc", "lightblue");
          pushEntityLinks(links, clickedNode, loc);
        });

        entityData?.ceo?.forEach((ceo) => {
          pushEntityNode(nodes, ceo, "per", "pink");
          pushEntityLinks(links, clickedNode, ceo);
        });

        entityData?.subsidiary?.forEach((org) => {
          pushEntityNode(nodes, org, "org", "lightgreen");
          pushEntityLinks(links, clickedNode, org);
        });
      }
      if (clickedNode?.__typename === "loc") {
        pushEntityMainNode(nodes, entityData, clickedNode?.__typename, "blue");
        if (entityData.capital) {
          pushEntityNode(nodes, entityData.capital, "loc", "lightblue");
          pushEntityLinks(links, clickedNode, entityData?.capital);
        }
        if (entityData["head_of_state"]) {
          pushEntityNode(nodes, entityData.head_of_state, "per", "pink");
          pushEntityLinks(links, clickedNode, entityData?.head_of_state);
        }
        if (entityData.highest_judicial_authority) {
          pushEntityNode(
            nodes,
            entityData.highest_judicial_authority,
            "per",
            "pink"
          );
          pushEntityLinks(
            links,
            clickedNode,
            entityData?.highest_judicial_authority
          );
        }
      }
      if (clickedNode?.__typename === "per") {
        pushEntityMainNode(nodes, entityData, clickedNode?.__typename, "red");
        entityData?.employer?.forEach((org) => {
          pushEntityNode(nodes, org, "org", "lightgreen");
          pushEntityLinks(links, clickedNode, org);
        });
      }

      setNodes(() => setNodes({ nodes: nodes, links: links }));
    }
  }, [entityData]);

  useEffect(() => {
    console.log("clicked Node: ");
    console.log(clickedNode);
  }, [clickedNode]);

  const handleClick = useCallback(
    (nodeArr) => {
      const nodes = [];
      const links = [];

      const node = nodeArr[0];
      setClickedNode(node);

      switch (node.__typename) {
        case "org":
          setCurrentEntityType(node.__typename);
          setCurrentEntityQid(node.id);
          break;
        case "loc":
          setCurrentEntityType(node.__typename);
          setCurrentEntityQid(node.id);

          break;
        case "per":
          setCurrentEntityType(node.__typename);
          setCurrentEntityQid(node.id);

          break;

        case "News":
          pushNewsNode(nodes, node);

          node.org.forEach((orgNode) => {
            if (orgNode.sameAs) {
              console.log(orgNode);
              pushNodes(nodes, orgNode, "org", "lightgreen");
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
            if (locNode.sameAs) {
              pushNodes(nodes, locNode, "loc", "lightblue");
              pushLinks(links, node, locNode);
            }

            setNodes(() => setNodes({ nodes: nodes, links: links }));
          });

        default:
          break;
      }
    },
    [nodes]
  );

  return (
    <div>
      <Search
        searchbarText={searchbarText}
        changeSearchbarText={(searchbarText) => setSearchbarText(searchbarText)}
        isEntitySelected={isEntitySelected}
        selectedEntityType={selectedEntityType}
        handleEntityTypeSelection={handleEntityTypeSelection}
        handleJaccardThreshold={handleJaccardThreshold}
        jaccardThreshold={jaccardThreshold}
        initialNodeAmount={initialNodeAmount}
        handleInitialNodeAmount={handleInitialNodeAmount}
      />
      {isLoadingNewsData && !errorNewsData && <p>Loading...</p>}
      {!isLoadingNewsData && (
        <ForceGraph2D
          height={900}
          width={1800}
          nodeColor={"color"}
          nodeLabel={"name"}
          nodeVal={"sizeInPx"}
          linkColor={"red"}
          backgroundColor={"white"}
          linkWidth={5}
          linkDirectionalParticles={3}
          graphData={nodes}
          nodeCanvasObjectMode={() => "after"}
          nodeCanvasObject={(node, ctx, globalScale) => {
            const label = node.name;
            const fontSize = node.__typename === "News" ? 4 : 3;
            ctx.font = `${fontSize}px Sans-Serif`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = node.__typename === "News" ? "black" : "black";
            if (node.__typename === "News") {
              const lineHeight = fontSize * 2;
              const lines = label.split(",");
              let x = node.x;
              let y = node.y - lineHeight;
              for (let i = 0; i < lines.length; ++i) {
                ctx.fillText(lines[i], x, y);
                y += lineHeight / 1.2;
              }
            } else if (globalScale >= 3.5) {
              ctx.fillText(label, node.x, node.y + 2.5);
            }
          }}
          onNodeClick={(node) => {
            if (node.__typename !== "News") {
              const arr = [node];
              handleClick(arr);
            } else handleClick(newsData.filter((news) => news.id === node.id));
          }}
        />
      )}
    </div>
  );
};

export default NewsNodeFrame;
