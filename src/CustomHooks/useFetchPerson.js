import { useState, useEffect } from "react";

const useFetchPerson = (url, qid) => {
  const [data, setSomeData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const QUERY = `query PersonByQid {
    personByQid(qid: "${qid}") {
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
        setSomeData(data["data"]["personByQid"]);
        setIsLoading(false);
        setError(null);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.message);
      });
  }, [url]);

  return { data, isLoading, error };
};

export default useFetchPerson;
