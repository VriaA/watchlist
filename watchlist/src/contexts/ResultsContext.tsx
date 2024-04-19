import { useLocation, useSearchParams } from "react-router-dom"
import { createContext, useState, useEffect } from "react";
import getSearchResults from "../utils/getSearchResults"
import { TResults } from "../types/resultTypes";
import { TChildren } from "../types/appTypes";

export const ResultsContext = createContext<TResults | null>(null)

export default function ResultsContextProvider({ children }: TChildren):JSX.Element {
    const [results, setResults] = useState<TResults | [] | string>([])
    const [searchParams] = useSearchParams()
    const location = useLocation()
    
    useEffect((): void => {
        
        const title: string | null = searchParams.get('title');

        async function getResults() {
            const results = await getSearchResults(title) as TResults
            setResults(results)
        }
        
        title ? getResults() : setResults('Please enter a valid title to search.')
      }, [location.search]);

    return  <ResultsContext.Provider value={results as TResults}>
                { children }
            </ResultsContext.Provider>
}