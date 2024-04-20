import { useState, useEffect, RefObject} from "react"
import { TUseSearch, THandleSearchFormSubmit } from "../types/useSearchTypes"

export default function useSearch(enterTitleMessageRef: RefObject<HTMLSpanElement>) {
    const [searchTitle, setSearchTitle] = useState<string>('')
    const [isSearchBarEmpty, setIsSearchBarEmpty] = useState<boolean>(false)

        // HIDES THE ENTER TITLE MESSAGE AFTER FOUR SECONDS
        useEffect(()=> {
            if(!isSearchBarEmpty) return
                const clearMessage: NodeJS.Timeout = setTimeout(()=> hideEnterTitleMessage() , 4000)
                return ()=> clearTimeout(clearMessage)
        }, [isSearchBarEmpty])
        
        // HIDES THE ENTER TITLE MESSAGE ONCE THERE IS TEXT IN THE SEARCH BAR
        useEffect(()=> {
            searchTitle && hideEnterTitleMessage()
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
        const handleSearchFormSubmit: THandleSearchFormSubmit = (e, navigate, setSearchParams)=> {
            e.preventDefault()
    
            const title: string = searchTitle.toLowerCase().trim().replace('&', '&26%')
            const isEmptySearchBar = searchTitle.trim().split('').length <= 0
    
            if(!isEmptySearchBar) {
                setIsSearchBarEmpty(false)
                navigate ? navigate(`search?title=${title}`) : setSearchParams ? setSearchParams({title: title}) : ''
            } else {
                setIsSearchBarEmpty(true)
            }
        }

        return { searchTitle, setSearchTitle, isSearchBarEmpty, setIsSearchBarEmpty, handleSearchFormSubmit } as TUseSearch
}