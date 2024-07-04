import { useState, useEffect, ChangeEvent } from "react"
import { useLocation } from "react-router-dom"
import { TUseSearch, THandleSearchFormSubmit } from "../types/useSearchTypes"
import getSearchResults from "../utils/getSearchResults"
import { TResults } from "../types/resultTypes"

export default function useSearch() {
    const location = useLocation()
    const [searchTitle, setSearchTitle] = useState<string>('')
    const [isTitleMessageVisible, setIsTitleMessageVisible] = useState<boolean>(false)
    const [suggestions, setSuggestions] = useState<TResults>([])
    const [isSuggestionsOpen, setIsSuggestionsOpen] = useState<boolean>(false)
    const titleToSearch: string = searchTitle.toLowerCase().trim().replace('&', '%2526')
    const isSearchBarEmpty: boolean = searchTitle.trim().split('').length <= 0

    // HIDES FILM SUGGESTIONS WHEN THERE IS NO TEXT IN THE SEARCH BAR
    // FETCHES AND DISPLAYS FILM SUGGESTIONS FOR THE TITLE IN THE SEARCH BAR AS IT IS BEING UPDATED
    useEffect(() => {
        if (isSearchBarEmpty) return
        async function getSearchSuggestions() {
            const suggestions = await getSearchResults(titleToSearch)
            if (Array.isArray(suggestions)) {
                setSuggestions(suggestions.splice(0, 3))
                setIsSuggestionsOpen(() => true)
            }
        }

        if (location.pathname !== '/') {
            const suggestionsTimeOut: NodeJS.Timeout = setTimeout(() => getSearchSuggestions(), 300)
            return () => clearTimeout(suggestionsTimeOut)
        }
    }, [searchTitle])

    function updateSearchTitleOnChange(e: ChangeEvent) {
        const searchBar = e.target as HTMLInputElement
        const searchBarValue = searchBar.value
        const isSearchBarEmpty: boolean = searchBarValue.trim().split('').length <= 0

        setSearchTitle(() => searchBarValue)
        !isSearchBarEmpty && hideTitleMessage()
    }

    function showTitleMessage(): void {
        setIsTitleMessageVisible(() => true)
        setTimeout(() => setIsTitleMessageVisible(() => false), 4000)
    }

    function hideTitleMessage(): void {
        setIsTitleMessageVisible(() => false)
    }

    // IF THE SEARCH BAR IS EMPTY OR FILLED WITH ONLY WHITESPACES, THE ENTER TITLE MESSAGE IS SHOWN
    // IF THE SEARCH BAR IS NOT EMPTY, THE USER IS REDIRECTED TO THE RESULTS PAGE OR THE URL SEARCH PARAMETER IS UPDATED 
    const handleSearchFormSubmit: THandleSearchFormSubmit = (e, navigate, setSearchParams) => {
        e.preventDefault()
        if (isSearchBarEmpty) {
            showTitleMessage()
        } else {
            setSearchTitle('')
            navigate ? navigate(`../search?title=${titleToSearch}`) : setSearchParams ? setSearchParams({ title: titleToSearch }) : ''
        }
    }

    return { searchTitle, isTitleMessageVisible, handleSearchFormSubmit, suggestions, updateSearchTitleOnChange, isSuggestionsOpen, setIsSuggestionsOpen, isSearchBarEmpty } as TUseSearch
}