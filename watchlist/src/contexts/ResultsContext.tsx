import { useLocation, useSearchParams } from "react-router-dom"
import { createContext, useState, useEffect } from "react";
import getSearchResults from "../utils/getSearchResults"
import { TResults } from "../types/resultTypes";
import { TChildren } from "../types/appTypes";

export const ResultsContext = createContext<TResults | null>(null)

export default function ResultsContextProvider({ children }: TChildren):JSX.Element {
    const [results, setResults] = useState<TResults | []>([])
    const [searchParams, setSearchparams] = useSearchParams()
    const location = useLocation()

    useEffect((): void => setSearchparams(()=> {
        const title: string = location.search.split('=')[1] || location.state
        return {'title': title}
        }
    ), [])
    
    useEffect((): void => {
        
        const title: string | null = searchParams.get('title');

        async function getResults() {
            const results = await getSearchResults(title) as TResults
            setResults(results)
        }
        title && getResults()
      }, [location.search]);

    return  <ResultsContext.Provider value={results as TResults}>
                { children }
            </ResultsContext.Provider>
}