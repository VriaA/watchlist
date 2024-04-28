import { useState, useEffect, RefObject, ChangeEvent} from "react"
import { useLocation } from "react-router-dom"
import { TUseSearch, THandleSearchFormSubmit } from "../types/useSearchTypes"
import getSearchResults from "../utils/getSearchResults"
import { TResults } from "../types/resultTypes"

export default function useSearch(enterTitleMessageRef: RefObject<HTMLSpanElement>) {
    const [searchTitle, setSearchTitle] = useState<string>('')
    const [isSearchBarEmpty, setIsSearchBarEmpty] = useState<boolean>(false)
    const [suggestions, setSuggestions] = useState<TResults>([])
    const location = useLocation()
    const suggestionsEl =  document.getElementById('suggestions') as HTMLUListElement
    const isEmptySearchBar: boolean = searchTitle.trim().split('').length <= 0
    const titleToSearch: string = searchTitle.toLowerCase().trim().replace('&', '%2526')

    // HIDES THE ENTER TITLE MESSAGE AFTER FOUR SECONDS
    useEffect(()=> {
        if(!isSearchBarEmpty) return
            const clearMessage: NodeJS.Timeout = setTimeout(()=> hideEnterTitleMessage() , 4000)
            return ()=> clearTimeout(clearMessage)
    }, [isSearchBarEmpty])
        
    // HIDES FILM SUGGESTIONS WHEN THERE IS NO TEXT IN THE SEARCH BAR
    // HIDES THE ENTER TITLE MESSAGE ONCE THERE IS TEXT IN THE SEARCH BAR
    // FETCHES AND DISPLAYS FILM SUGGESTIONS FOR THE TITLE IN THE SEARCH BAR AS IT IS BEING UPDATED
    useEffect(()=> {
        if (isEmptySearchBar) {
            hideSuggestions()
        } else {
            hideEnterTitleMessage()

            async function getSearchSuggestions() {
                const suggestions = await getSearchResults(titleToSearch)

                if(Array.isArray(suggestions)) {
                    setSuggestions(suggestions.splice(0, 3))
                    showSuggestions()
                }
            }
                
            if(location.pathname !== '/') {
                const suggestionsTimeOut: NodeJS.Timeout = setTimeout(()=> {
                    getSearchSuggestions()
                }, 300) 
                return ()=> clearTimeout(suggestionsTimeOut)
            }  
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

    function hideSuggestions() {
        if(!suggestionsEl) return
        suggestionsEl.classList.add('hidden')
        suggestionsEl.classList.remove('flex')
    }

    function showSuggestions() {
        if(!suggestionsEl) return
        suggestionsEl.classList.remove('hidden')
        suggestionsEl.classList.add('flex')
    }

    function updateSearchTitleOnChange(e: ChangeEvent) {
        const searchBar = e.target as HTMLInputElement
        setSearchTitle(searchBar.value)
    }
    
    // IF THE SEARCH BAR IS NOT EMPTY, THE USER IS REDIRECTED TO THE RESULTS PAGE OR THE URL SEARCH PARAMETER IS UPDATED
    // IF THE SEARCH BAR IS EMPTY, isSearchBarEmpty IS SET TO TRUE WHICH RESULTS IN THE DISPLAY OF THE ENTER TITLE MESSAGE
    // THIS PREVENTS SEARCHING WHEN THE SEARCH BAR IS EMPTY OR FILLED WITH ONLY WHITESPACES
    // IF THE SEARCH BAR IS NOT EMPTY, THE USER IS REDIRECTED TO THE RESULTS PAGE OR THE URL SEARCH PARAMETER IS UPDATED 
    const handleSearchFormSubmit: THandleSearchFormSubmit = (e, navigate, setSearchParams)=> {
        e.preventDefault()
    
        if(!isEmptySearchBar) {
            setIsSearchBarEmpty(false)
            setSearchTitle('')
            navigate ? navigate(`../search?title=${titleToSearch}`) : setSearchParams ? setSearchParams({title: titleToSearch}) : ''
        } else {
            setIsSearchBarEmpty(true)
        }
    }

    return { searchTitle, setSearchTitle, isSearchBarEmpty, setIsSearchBarEmpty, handleSearchFormSubmit, suggestions, isEmptySearchBar, updateSearchTitleOnChange } as TUseSearch
}