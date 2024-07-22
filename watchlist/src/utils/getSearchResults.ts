import { TResult, TData, TResults } from "../types/resultTypes";

export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
  },
};

export default async function getSearchResults(title: string | null) {
  try {
    if (title) {
      const response: Response = await fetch(
        `https://api.themoviedb.org/3/search/multi?query=${title}&include_adult=false&language=en-US&page=1`,
        options,
      );
      handleResponseError(response);

      const data: TData = await response.json();
      const searchResults: TResults = data.results.filter(
        (result: TResult) => result.media_type != "person",
      );
      handleNoResultError(searchResults);

      return searchResults;
    } else {
      throw new Error("Search for a valid title");
    }
  } catch (error: any) {
    return error.message;
  }
}

// THROWS AN ERROR BASED ON THE ERROR CODE RECEIVED DURING THE FETCHING PROCESS
function handleResponseError(response: Response) {
  if (!response.ok) {
    if (response.status >= 500) {
      throw new Error("Unable to connect to the server.");
    } else if (response.status === 429) {
      throw new Error("Too many requests: Please try again later.");
    } else {
      throw new Error(
        "Error fetching results. \n Please check your internet connection and try again.",
      );
    }
  }
}

function handleNoResultError(searchResults: TResults) {
  if (searchResults.length <= 0) {
    throw new Error("No results found.");
  }
}
