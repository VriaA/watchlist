import { useLocation, useSearchParams } from "react-router-dom"
import { createContext, useState, useEffect } from "react";
import getSearchResults from "../utils/getSearchResults"
import { TResultContextProvider, TResults } from "../types/resultTypes";

export const ResultsContext = createContext<TResults | null>(null)

export default function ResultsContextProvider({ children }: TResultContextProvider):JSX.Element {
    const [results, setResults] = useState<TResults | []>([])
    const [searchParams, setSearchparams] = useSearchParams()
    const location = useLocation()

    useEffect((): void => setSearchparams(()=> {
        const title: string = location.search.split('=')[1] || location.state
        return {'title': title}
    }
    ), [])
    
    useEffect((): void => {
        const title = searchParams.get('title');
        async function getResults() {
            const results = await getSearchResults(title) as TResults
            setResults(results)
        }
        getResults()
      }, [location.search]);

    return  <ResultsContext.Provider value={results as TResults}>
                { children }
            </ResultsContext.Provider>
}