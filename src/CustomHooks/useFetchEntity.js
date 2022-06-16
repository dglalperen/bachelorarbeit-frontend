import { useState, useEffect } from "react";
import { getEntityQuery } from "../Queries/getEntityQuery";

const getDataUnwrapper = (entityType) => {
  switch (entityType) {
    case "org":
      return "companyByQid";
    case "per":
      return "personByQid";
    case "loc":
      return "locationByQid";
    default:
      break;
  }
};

const useFetchEntity = (url, entityType, qid) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const QUERY = getEntityQuery(entityType, qid);

  useEffect(() => {
    console.log("useFetchEntity was called");
    setIsLoading(true);
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: QUERY }),
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data["data"][getDataUnwrapper(entityType)]);
        setIsLoading(false);
        setError(null);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.message);
      });
  }, [url, entityType, qid]);

  return { data, isLoading, error };
};

export default useFetchEntity;
