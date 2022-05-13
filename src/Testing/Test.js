import useFetchTest from "./useFetchTest";
import ForceGraph2D from "react-force-graph-2d";
import { companyByQid } from "../Queries/queries";
import { useEffect, useState } from "react";
import { randomColor } from "../Helpers/generateColor";

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

  // 2. Daten bearbeiten --> MainNode erstellen in ein State, Country, CEO, (Subsidiary)
  const [countriesNode, setCountriesNode] = useState([]);

  // 3. MainNode an Forcegraph übergeben (nodes State wird als graphdata übergeben)
  const [nodes, setNodes] = useState({
    nodes: [],
    links: [],
  });

  useEffect(() => {
    console.clear();
    // Pushing countries to countriesNode
    const currentCountryNodes = [];
    const currentCountryLinks = [];
    const origin = {
      id: data.qid,
      name: data.label,
      __typename: data.type,
      color: "blue",
      sizeInPx: 6,
    };

    if (data.country) {
      data.country.forEach((country) => {
        currentCountryNodes.push({
          id: country.qid,
          name: country.label,
          __typename: "country",
          color: "red",
          sizeInPx: 5,
        });

        currentCountryLinks.push({
          source: nodes.id,
          target: country.id,
        });
      });
      setCountriesNode(currentCountryNodes);
      setNodes({
        nodes: currentCountryNodes.concat(origin),
        links: currentCountryLinks,
      });
    }
    console.log(nodes);
  }, []);

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
          graphData={nodes}
        />
      )}
    </div>
  );
};

export default Test;
