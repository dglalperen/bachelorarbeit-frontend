import ForceGraph2D from "react-force-graph-2d";
import { useEffect, useState } from "react";
import useFetchCompany from "../CustomHooks/useFetchCompany";
import createMainNode from "../Helpers/createMainNode";

const NodeFrame = () => {
  const {
    someData: data,
    isLoading,
    error,
  } = useFetchCompany("http://195.37.233.209:4000/graphql", "Q154950");

  const [clickCounter, setClickCounter] = useState(0);
  const [nodes, setNodes] = useState({
    nodes: [],
    links: [],
  });

  const setStateCB = (newState) => {
    setNodes(newState);
  };

  useEffect(() => {
    createMainNode(data, setStateCB);
  }, [data]);

  const handleNodeClick = (node, event) => {
    // Append new nodes to nodes State
    if (node.__typename === "company" && clickCounter == 0) {
      if (data.country) {
        const currentNodes = [];
        const currentLinks = [];

        //! Fetching Persondata with gotten QID
        /*const { someData: personData } = useFetchPerson(
          "http://195.37.233.209:4000/graphql",
          "Q15650949"
        ); */

        data.country.forEach((country) => {
          currentNodes.push({
            id: country.qid,
            name: country.label,
            __typename: "country",
            color: "green",
            sizeInPx: 5,
          });
          currentLinks.push({ source: node.id, target: country.qid });
        });

        data.ceo.forEach((ceo) => {
          currentNodes.push({
            id: ceo.qid,
            name: ceo.label,
            __typename: "ceo",
            color: "yellow",
            sizeInPx: 5,
          });

          currentLinks.push({ source: node.id, target: ceo.qid });
        });

        const newNodes = currentNodes.concat(nodes.nodes);
        const newLinks = currentLinks.concat(nodes.links);

        setClickCounter(1);
        setNodes({ nodes: newNodes, links: newLinks });
      }
    }
  };

  return (
    <div>
      {isLoading && !error && <p>Loading...</p>}

      {!isLoading && (
        <ForceGraph2D
          height={800}
          width={1000}
          backgroundColor="#fdf7fa"
          nodeColor={"color"}
          nodeLabel={"name"}
          nodeVal={"sizeInPx"}
          linkColor={"black"}
          linkWidth={5}
          linkDirectionalParticles={2}
          graphData={nodes}
          onNodeClick={handleNodeClick}
        />
      )}
    </div>
  );
};

export default NodeFrame;
