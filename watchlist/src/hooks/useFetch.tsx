import { useEffect, useState } from "react";

// TODO: Use custom hook in home & results page.
// const searchResults: U = data.results.filter((result: V)=> result.media_type != 'person')
// `https://api.themoviedb.org/3/search/multi?query=${title}&include_adult=false&language=en-US&page=1`
export default function useFetch(url: string) {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYjhiOTQxM2EwYzk3NTE1YzUwNTkyZTRlY2Y5MjM0MSIsInN1YiI6IjY0ZDA1YTJhNGQ2NzkxMDBlMjQwZjE2MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xbqgGX1THEkUWs4NigowqE8P8tLn8hYScBzSfL5dYmI'
        }
    };

    const [results, setResults] = useState(null)
    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(()=> {
        async function getResults() {
            setLoading(true)
            try {
                const response: Response = await fetch(url, options)
                handleResponseError(response)
                const data = await response.json()
                setResults(data)
            } catch (error: any) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }
        getResults()
    }, [url])

    // THROWS AN ERROR BASED ON THE ERROR CODE RECEIVED DURING THE FETCHING PROCESS
    function handleResponseError(response: Response) {
        if(response.ok) return
        if(response.status >= 500) {
            throw new Error('Unable to connect to the server.')
        } else if (response.status === 429) {
            throw new Error('Too many requests: Please try again later.');
        } else {
            throw new Error('Error fetching results. \n Please check your internet connection and try again.')
        }
    }

    return { results, error, loading }
}