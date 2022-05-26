import useFetchTest from "./useFetchTest";
import ForceGraph2D from "react-force-graph-2d";
import { companyByQid } from "../Queries/queries";
import { useEffect, useState } from "react";
import { randomColor } from "../Helpers/generateColor";
import { click } from "@testing-library/user-event/dist/click";

const Test = () => {
  // 4. onClick --> Daten bearbeiten (Arrays kollidieren) und wieder an Forcegraph übergeben

  // 1. Daten holen --> Objekt einer Company
  const {
    someData: data,
    isLoading,
    error,
  } = useFetchTest(
    "http://195.37.233.209:4000/graphql",
    `${companyByQid}`,
    "companyByQid"
  );

  const [clickCounter, setClickCounter] = useState(0);

  // 2. Daten bearbeiten --> MainNode erstellen in ein State, Country, CEO, (Subsidiary)
  const [countriesNode, setCountriesNode] = useState([]);

  // 3. MainNode an Forcegraph übergeben (nodes State wird als graphdata übergeben)
  const [nodes, setNodes] = useState({
    nodes: [],
    links: [],
  });

  const handleNodeClick = (node, event) => {
    // Append new nodes to nodes State
    if (node.__typename === "company") {
      if (data.country && clickCounter === 0) {
        const countryNodes = [];
        const countryLinks = [];
        data.country.forEach((country) => {
          countryNodes.push({
            id: country.qid,
            name: country.label,
            __typename: "country",
            color: "green",
            sizeInPx: 5,
          });

          countryLinks.push({ source: node.id, target: country.qid });
        });

        const ceoNodes = [];
        const ceoLinks = [];
        data.ceo.forEach((ceo) => {
          ceoNodes.push({
            id: ceo.qid,
            name: ceo.label,
            __typename: "ceo",
            color: "yellow",
            sizeInPx: 5,
          });

          ceoLinks.push({ source: node.id, target: ceo.qid });
        });

        const oldNodes = countryNodes.concat(nodes.nodes);
        const newNodes = oldNodes.concat(ceoNodes);

        const newLinks = countryLinks.concat(ceoLinks);
        //setNodes({ ...nodes, nodes: newNodes });
        setNodes({ nodes: newNodes, links: newLinks });
        setClickCounter(1);
      }
    }
  };

  useEffect(() => {
    if (data.qid) {
      setNodes({
        nodes: [
          {
            id: data.qid,
            name: data.label,
            __typename: data.type,
            color: "blue",
            sizeInPx: 6,
          },
        ],
        links: [],
      });
    }
  }, [data]);

  return (
    <div className="test">
      {isLoading && !error && <p>Loading...</p>}

      {!isLoading && !error && <p>Beispiel Firma: {data.label}</p>}

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

export default Test;
