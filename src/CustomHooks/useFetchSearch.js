import { useState, useEffect } from "react";

const useFetchSearch = (url, entityType, entity) => {
  const [data, setSomeData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const QUERY = `query {
    newsSearch(limit: 200, entity: "${entityType}", keywords: "${entity}"){
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

  useEffect(() => {
    setIsLoading(true);

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: QUERY }),
    })
      .then((response) => response.json())
      .then((data) => {
        setSomeData(data["data"]["newsSearch"]);
        setIsLoading(false);
        setError(null);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.message);
      });
  }, [entity, entityType]);

  return { data, isLoading, error };
};

export default useFetchSearch;
