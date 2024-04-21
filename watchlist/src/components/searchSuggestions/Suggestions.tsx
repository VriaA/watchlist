import Suggestion from "./Suggestion"
import { TResult, TResults } from "../../types/resultTypes"

export default function Suggestions({suggestions}: {suggestions: TResults}) {
    
    const suggestionsElArray =  suggestions.map( ( suggestion: TResult, i)=> {
        return <Suggestion key={i} suggestion={suggestion} /> 
    })

    return (
        <>
            {   suggestions && 
                    <ul id="suggestions" className={`invisible films search-suggestions z-30 transition-all`}>
                        {suggestionsElArray}
                    </ul>        
            }
        </>
    )
}