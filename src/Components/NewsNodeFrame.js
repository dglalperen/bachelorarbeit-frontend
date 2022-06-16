import ForceGraph2D from "react-force-graph-2d";
import { useCallback, useEffect, useRef, useState } from "react";
import useFetchSearch from "../CustomHooks/useFetchSearch";
import Search from "./Search";
import {
  pushEntityMainNode,
  pushEntityNode,
  pushNewsNode,
  pushNodes,
} from "../Helpers/nodeAdders";
import { pushEntityLinks, pushLinks } from "../Helpers/linkAdders";
import useFetchEntity from "../CustomHooks/useFetchEntity";
import { getJaccardIndexOf } from "../Helpers/jaccardHelper";

const NewsNodeFrame = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedEntityType, setSelectedEntityType] = useState("");
  const [currentEntityType, setCurrentEntityType] = useState(null);
  const [currentEntityQid, setCurrentEntityQid] = useState(null);
  const [currentNode, setCurrentNode] = useState(null);

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
    setIsLoading: setIsLoadingNewsData,
    error: errorNewsData,
  } = useFetchSearch(
    "http://195.37.233.209:4000/graphql",
    selectedEntityType,
    searchText
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

  const [nodes, setNodes] = useState({
    nodes: [],
    links: [],
  });

  useEffect(() => {
    if (newsData) {
      const nodes = [];
      const links = [];
      newsData.forEach((news) => {
        pushNewsNode(nodes, news);
        newsData.forEach((comparisonNews) => {
          if (news === comparisonNews) {
          } else {
            let jacPer = getJaccardIndexOf(news.per, comparisonNews.per);
            let jacOrg = getJaccardIndexOf(news.org, comparisonNews.org);
            let jacLoc = getJaccardIndexOf(news.loc, comparisonNews.loc);
            let jaccardIndex = (jacOrg + jacPer + jacLoc) / 3;

            if (jaccardIndex >= 0.4) {
              links.push({
                source: news.id,
                target: comparisonNews.id,
              });
            }
          }
        });
      });
      setNodes({ nodes: nodes, links: links });
    }
  }, [newsData]);

  useEffect(() => {
    console.clear();
    console.log(nodes);
  }, [nodes]);

  //! When Child Node is clicked, the entityData changes
  //! Causing the view to update
  useEffect(() => {
    if (entityData) {
      const nodes = [];
      const links = [];

      if (currentNode?.__typename === "org") {
        pushEntityMainNode(nodes, entityData, currentNode?.__typename, "green");
        entityData?.country?.forEach((loc) => {
          pushEntityNode(nodes, loc, "loc", "lightblue");
          //pushEntityLinks(links, currentNode?.id, loc.qid);
          links.push({
            source: currentNode?.id,
            target: loc.qid,
          });
        });

        entityData?.ceo?.forEach((ceo) => {
          pushEntityNode(nodes, ceo, "per", "pink");
          //pushEntityLinks(links, currentNode?.id, ceo.qid);
          links.push({
            source: currentNode?.id,
            target: ceo.qid,
          });
        });

        entityData?.subsidiary?.forEach((org) => {
          pushEntityNode(nodes, org, "org", "lightgreen");
          //pushEntityLinks(links, currentNode?.id, org.qid);
          links.push({
            source: currentNode?.id,
            target: org.qid,
          });
        });
      }
      if (currentNode?.__typename === "loc") {
        pushEntityMainNode(nodes, entityData, currentNode?.__typename, "blue");
        if (entityData["head_of_state"]) {
          console.log(entityData["head_of_state"]);
          /* entityData["head_of_state"]?.forEach((per) => {
            pushEntityNode(nodes, per, "per", "pink");
            links.push({
              source: currentNode?.id,
              target: per.qid,
            });
          }); */
        }
      }
      if (currentNode?.__typename === "per") {
        pushEntityMainNode(nodes, entityData, currentNode?.__typename, "red");
        entityData?.employer?.forEach((org) => {
          pushEntityNode(nodes, org, "org", "lightgreen");
          links.push({
            source: currentNode?.id,
            target: org.qid,
          });
          //pushEntityLinks(links, currentNode?.id, org.qid);
        });
      }

      setNodes(() => setNodes({ nodes: nodes, links: links }));
    }
  }, [entityData]);

  const handleClick = useCallback(
    (nodeArr) => {
      const nodes = [];
      const links = [];

      const node = nodeArr[0];
      setCurrentNode(node);

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
          console.log("Node Array Before: ");
          console.log(nodes);
          pushNewsNode(nodes, node);

          node.org.forEach((orgNode) => {
            if (orgNode.sameAs) {
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
        searchText={searchText}
        changeSearchText={(text) => setSearchText(text)}
        isSelected={isSelected}
        selectedEntityType={selectedEntityType}
        handleRadioClick={handleRadioClick}
      />
      {isLoadingNewsData && !errorNewsData && <p>Loading...</p>}
      {!isLoadingNewsData && (
        <ForceGraph2D
          height={1000}
          width={1800}
          nodeColor={"color"}
          nodeLabel={"name"}
          linkAutoColorBy={"__typename"}
          nodeVal={"sizeInPx"}
          linkDirectionalParticles={3}
          graphData={nodes}
          nodeCanvasObjectMode={() => "after"}
          nodeCanvasObject={(node, ctx, globalScale) => {
            const label = node.name;
            const fontSize = node.__typename === "News" ? 4 : 3;
            ctx.font = `${fontSize}px Sans-Serif`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = node.__typename === "News" ? "white" : "black";
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
          onNodeClick={(node, event) => {
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
