import ForceGraph2D from "react-force-graph-2d";
import { useEffect, useState } from "react";
import useFetchCompany from "../CustomHooks/useFetchCompany";
import createMainNode from "../Helpers/createMainNode";
import useFetchPerson from "../CustomHooks/useFetchPerson";

const NodeFrame = () => {
  //! Fetching Company Data -- Main Node
  const {
    data: companyData,
    isLoading: isLoadingCompanyData,
    error: errorCompanyData,
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
    createMainNode(companyData, setStateCB);
  }, [companyData]);

  //! Fetching Person Data -- Child Nodes
  const [ceos, setCeos] = useState([]);

  useEffect(() => {
    console.log("ceos");
    console.log(ceos);
  }, [ceos]);

  useEffect(() => {
    console.log("nodes");
    console.log(nodes);
  }, [nodes]);

  const handleNodeClick = (node, event) => {
    // Append new nodes to nodes State
    if (node.__typename === "company" && clickCounter === 0) {
      if (companyData.country) {
        const currentNodes = [];
        const currentLinks = [];

        companyData.country.forEach((country) => {
          currentNodes.push({
            id: country.qid,
            name: country.label,
            __typename: "country",
            color: "green",
            sizeInPx: 5,
          });
          currentLinks.push({ source: node.id, target: country.qid });
        });

        for (let i = 0; i < companyData.ceo.length; i++) {
          fetch("http://195.37.233.209:4000/graphql", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              query: `query PersonByQid {
                personByQid(qid: "${companyData.ceo[i].qid}") {
                  qid
                  type
                  label
                  description
                  date_of_birth
                  date_of_death
                  place_of_birth {
                    qid
                    label
                  }
                country_of_citizenship {
                    qid
                    label
                  }
                  employer {
                    qid
                    label
                  }
              }
              }`,
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              const unfoldedData = data["data"]["personByQid"];
              if (unfoldedData) {
                setCeos((ceos) => [...ceos, unfoldedData]);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }

        if (ceos) {
          console.log("ceos werden gepusht");
          ceos.forEach((ceo) => {
            currentNodes.push({
              id: ceo.qid,
              name: ceo.label,
              __typename: "ceo",
              color: "purple",
              sizeInPx: 5,
            });

            currentLinks.push({ source: node.id, target: ceo.qid });
          });
        }
        const newNodes = currentNodes.concat(nodes.nodes);
        const newLinks = currentLinks.concat(nodes.links);

        setClickCounter(1);
        setNodes({ nodes: newNodes, links: newLinks });
      }
    }
  };

  return (
    <div>
      {isLoadingCompanyData && !errorCompanyData && <p>Loading...</p>}

      {!isLoadingCompanyData && (
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
          onNodeClick={handleNodeClick}
        />
      )}
    </div>
  );
};

export default NodeFrame;
