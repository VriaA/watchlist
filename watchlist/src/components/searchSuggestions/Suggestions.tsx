import { useRef } from 'react'
import Suggestion from "./Suggestion"
import { TResult, TResults } from "../../types/resultTypes"
import useCloseOnClickOutside from '../../hooks/useCloseOnClickOutside'

export default function Suggestions({suggestions}: {suggestions: TResults}) {
    
    const suggestionsRef = useRef<HTMLUListElement>(null)
    useCloseOnClickOutside(suggestionsRef)

    const suggestionsElArray =  suggestions.map( ( suggestion: TResult, i)=> {
        return <Suggestion key={i} suggestion={suggestion} /> 
    })

    return (
        <>
            {   suggestions && 
                    <ul id="suggestions" 
                        className={`films search-suggestions z-30 transition-all`}
                        ref={suggestionsRef}>
                        {suggestionsElArray}
                    </ul>        
            }
        </>
    )
}