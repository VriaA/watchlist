import { createContext, useState, useEffect } from "react";
import getSearchResults from "../utils/getSearchResults"

export const ResultsContext = createContext(null)

export default function ResultsContextProvider({ children }):JSX.Element {
    const [results, setResults] = useState([])
    
    useEffect(()=> {
       getSearchResults()
       .then(response=> setResults(response))
    }, [])

    return  <ResultsContext.Provider value={results}>
                { children }
            </ResultsContext.Provider>
}