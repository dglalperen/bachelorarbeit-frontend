import { useState, useEffect } from "react";

const useFetchTest = (url, queryWithBackTicks, dataUnwrap) => {
  const [someData, setSomeData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const QUERY = queryWithBackTicks;

  useEffect(() => {
    setIsLoading(true);
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: QUERY }),
    })
      .then((response) => response.json())
      .then((data) => {
        setSomeData(data["data"][dataUnwrap]);
        setIsLoading(false);
        setError(null);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.message);
      });
  }, [url]);

  return { someData, isLoading, error };
};

export default useFetchTest;
