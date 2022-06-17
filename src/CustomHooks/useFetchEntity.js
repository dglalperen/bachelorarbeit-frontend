import { useState, useEffect } from "react";
import { getEntityQuery } from "../Helper Functions/getEntityQuery";
import { getDataUnwrapper } from "../Helper Functions/getDataUnwrapper";

const useFetchEntity = (url, entityType, qid) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const QUERY = getEntityQuery(entityType, qid);

  useEffect(() => {
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
