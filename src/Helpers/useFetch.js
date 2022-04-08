import { useState, useEffect } from "react";

const useFetch = (url,queryWithBackTicks,dataUnwrap,dataUnwrap2) => {
    const [someData,setSomeData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null)
    const QUERY = queryWithBackTicks

    useEffect(() => {
        fetch(url, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ query: QUERY})
        })
        .then(response => response.json())
        .then(data => {
            if(dataUnwrap2) setSomeData(data["data"][dataUnwrap][dataUnwrap2])
             else setSomeData(data["data"][dataUnwrap])
            setIsLoading(false)
            setError(null)
        })
        .catch(err => {
            setIsLoading(false)
            setError(err.message)
        })

    }, [url]) 

    return {someData,isLoading,error}
}

export default useFetch;