import { useEffect, useRef } from 'react'
import Suggestion from "./Suggestion"
import { TResult, TResults } from "../../types/resultTypes"
import { hideOnClickOutside } from '../../utils/hideOnClickOutside'

export default function Suggestions({suggestions}: {suggestions: TResults}) {
    
    const suggestionsRef = useRef<HTMLUListElement>(null)

    useEffect(()=> {
        if(!suggestionsRef.current) return

        function hideSuggestionOnClickOutside (e: MouseEvent): void {
            const suggestionsEl = suggestionsRef.current as HTMLUListElement
            hideOnClickOutside(e, suggestionsEl)
        }
        
        document.addEventListener('click',  hideSuggestionOnClickOutside)
        return ()=> document.removeEventListener('click', hideSuggestionOnClickOutside)
    }, [])

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