import { useState, useEffect } from "react";
import { getEntityQuery } from "../HelperFunctions/getEntityQuery";
import { getDataUnwrapper } from "../HelperFunctions/getDataUnwrapper";

const useFetchEntity = (url, entityType, qid, entityName) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const QUERY = getEntityQuery(entityType, qid);

  useEffect(() => {
    setIsLoading(true);
    if (entityType && qid) {
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
          setError("Cannot find any Data concerning the Entity: " + entityName);
        });
    }
  }, [url, entityType, qid, entityName]);

  return { data, isLoading, error, setError };
};

export default useFetchEntity;
