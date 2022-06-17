import { useState, useEffect } from "react";

const useFetchSearch = (url, entityType, entity, nodeAmount) => {
  const [data, setSomeData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const QUERY = `query {
    newsSearch(limit: ${nodeAmount}, entity: "${entityType}", keywords: "${entity}"){
      __typename
      id
      headline
      org{
        name
        sameAs
      }
      per{
        name
        sameAs
      }
      loc{
        name
        sameAs
      }
      
    }
  }`;

  const getData = () => {
    setIsLoading(true);
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: QUERY }),
    })
      .then((response) => response.json())
      .then((data) => {
        setSomeData(data["data"]["newsSearch"]);
        console.log("api is called");
        setIsLoading(false);
        setError(null);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.message);
      });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      getData();
    }, 500);

    return () => clearTimeout(timer);
  }, [entity, entityType, nodeAmount]);

  return { data, isLoading, error };
};

export default useFetchSearch;
