import { useState, useEffect } from "react";

const useFetchCompany = (url, qid) => {
  const [someData, setSomeData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const QUERY = `query companyByQid {
    companyByQid(qid: "${qid}") {
      type
      qid
      label
      description
      image
      country {
        qid
        label
      }
      ceo {
        qid
        label
      }
      subsidiary {
        qid
        label
      }
  }
  }`;

  console.log(QUERY);

  useEffect(() => {
    setIsLoading(true);
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: QUERY }),
    })
      .then((response) => response.json())
      .then((data) => {
        setSomeData(data["data"]["companyByQid"]);
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

export default useFetchCompany;
