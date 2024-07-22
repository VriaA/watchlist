import { useEffect, useState } from "react";
import { TSearchResult } from "../types/resultTypes";
import { TMovie, TSeries } from "../types/filmTypes";

export default function useFetch(url: string | null) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    },
  };

  const [results, setResults] = useState<TSearchResult | TMovie | TSeries | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (!url) return
    async function getResults() {
      setResults(null);
      setLoading(true);
      try {
        const response: Response = await fetch((url as string), options);
        handleResponseError(response);
        const data = await response.json();
        setResults(data);
      } catch (error: any) {
        setError(error?.message);
      } finally {
        setLoading(false);
      }
    }
    getResults();
  }, [url]);

  // THROWS AN ERROR BASED ON THE ERROR CODE RECEIVED DURING THE FETCHING PROCESS
  function handleResponseError(response: Response) {
    if (response.ok) return;
    if (response.status >= 500) {
      throw new Error("Unable to connect to the server.");
    } else if (response.status === 429) {
      throw new Error("Too many requests: Please try again later.");
    } else {
      throw new Error(
        "Failed to fetch. \n Please check your internet connection and try again.",
      );
    }
  }

  return { results, error, loading };
}
