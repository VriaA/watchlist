import { useState, useEffect, RefObject} from "react"
import { useLocation } from "react-router-dom"
import { TUseSearch, THandleSearchFormSubmit } from "../types/useSearchTypes"
import getSearchResults from "./getSearchResults"
import { TResults } from "../types/resultTypes"

export default function useSearch(enterTitleMessageRef: RefObject<HTMLSpanElement>) {
    const [searchTitle, setSearchTitle] = useState<string>('')
    const [isSearchBarEmpty, setIsSearchBarEmpty] = useState<boolean>(false)
    const [suggestions, setSuggestions] = useState<TResults>([])
    const isEmptySearchBar = searchTitle.trim().split('').length <= 0
    const location = useLocation()

    // HIDES THE ENTER TITLE MESSAGE AFTER FOUR SECONDS
    useEffect(()=> {
        if(!isSearchBarEmpty) return
            const clearMessage: NodeJS.Timeout = setTimeout(()=> hideEnterTitleMessage() , 4000)
            return ()=> clearTimeout(clearMessage)
    }, [isSearchBarEmpty])
        
    // HIDES THE ENTER TITLE MESSAGE ONCE THERE IS TEXT IN THE SEARCH BAR
    useEffect(()=> {
        if (isEmptySearchBar) return 
            hideEnterTitleMessage()

        async function getSearchSuggestions() {
            const suggestions = await getSearchResults(searchTitle)

            if(Array.isArray(suggestions)) {
                setSuggestions(suggestions.splice(0, 3))
            }
        }
            
        if(location.pathname !== '/') {
           const suggestionsTimeOut = setTimeout(()=> getSearchSuggestions(), 300) 
           return ()=> clearTimeout(suggestionsTimeOut)
        }  
    }, [searchTitle])
        
    // HIDES THE ENTER TITLE MESSAGE IF IT IS VISIBLE
    function hideEnterTitleMessage() {
        if(enterTitleMessageRef.current && enterTitleMessageRef.current.classList.contains('opacity-1')) {
            enterTitleMessageRef.current.classList.remove('opacity-1')
            enterTitleMessageRef.current.classList.add('opacity-0')
            setIsSearchBarEmpty(false)
        }
    }
    
    // IF THE SEARCH BAR IS NOT EMPTY, THE USER IS REDIRECTED TO THE RESULTS PAGE OR THE URL SEARCH PARAMETER IS UPDATED
    // IF THE SEARCH BAR IS EMPTY, isSearchBarEmpty IS SET TO TRUE WHICH RESULTS IN THE DISPLAY OF THE ENTER TITLE MESSAGE
    // THIS PREVENTS SEARCHING WHEN THE SEARCH BAR IS EMPTY OR FILLED WITH ONLY WHITESPACES
    // IF THE SEARCH BAR IS NOT EMPTY, THE USER IS REDIRECTED TO THE RESULTS PAGE OR THE URL SEARCH PARAMETER IS UPDATED 
    const handleSearchFormSubmit: THandleSearchFormSubmit = (e, navigate, setSearchParams)=> {
        e.preventDefault()
    
        if(!isEmptySearchBar) {
            setIsSearchBarEmpty(false);
            (document.getElementById('search-input') as HTMLInputElement).value = ''
            navigate ? navigate(`search?title=${searchTitle}`) : setSearchParams ? setSearchParams({title: searchTitle}) : ''
        } else {
            setIsSearchBarEmpty(true)
        }
    }

    return { searchTitle, setSearchTitle, isSearchBarEmpty, setIsSearchBarEmpty, handleSearchFormSubmit, suggestions } as TUseSearch
}