import { useEffect, useState } from "react";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { TAppContext } from "../types/appTypes";
// TODO: Use custom hook in home & results page.
// const searchResults: U = data.results.filter((result: V)=> result.media_type != 'person')
// `https://api.themoviedb.org/3/search/multi?query=${title}&include_adult=false&language=en-US&page=1`
export default function useFetch(url: string) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    },
  };

  const [results, setResults] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const { setLoading } = useContext(AppContext) as TAppContext;

  useEffect(() => {
    async function getResults() {
      setResults(null);
      setLoading(true);
      try {
        const response: Response = await fetch(url, options);
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

  return { results, error };
}
