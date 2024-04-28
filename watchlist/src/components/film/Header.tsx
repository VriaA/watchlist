import { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import useSearch from "../../hooks/useSearch"
import Suggestions from "../searchSuggestions/Suggestions"

export default function Header() {
    const searchFieldRef = useRef<HTMLFieldSetElement | null>(null)
    const enterTitleMessageRef = useRef<HTMLSpanElement | null>(null)
    const { searchTitle, updateSearchTitleOnChange, isSearchBarEmpty, handleSearchFormSubmit, suggestions, isEmptySearchBar } = useSearch(enterTitleMessageRef)
    const navigate = useNavigate()

    function toggleSearchBarVisibility() {
        const isPC = window.innerWidth >= 1024
        const searchField = searchFieldRef.current
        if(!searchField) return
            searchField.classList.toggle('hidden')
            searchField.style.width = isPC ? '500px' : '250px'     
    }

    return (
        <header className="absolute flex justify-end items-center gap-4 w-full p-[4%] md:p-[2%] lg:snap-start">
                        
            <nav className="flex justify-end items-center gap-4">

                    <form className="relative h-10 min-w-[38px] cursor-pointer" title="Search" onSubmit={(e)=> handleSearchFormSubmit(e, navigate)}>
                    
                        <button onClick={toggleSearchBarVisibility} type="button" className="absolute inset-0 my-auto left-2 z-50 w-fit h-fit transition-transform hover:-translate-y-1 active:translate-y-1">
                            <span className="material-symbols-outlined text-3xl font-light md:font-extralight">
                                search 
                            </span> 
                        </button>

                        <fieldset ref={searchFieldRef} className="hidden relative w-1 h-full px-2 z-40 bg-zinc-900/30 backdrop-blur-md rounded-2xl overflow-hidden border border-stone-900/30">
                            <input className="w-full h-full ml-2 px-10 font-light bg-transparent text-[10px] min-[375px]:text-sm md:text-base caret-slate-100 outline-none border-none" 
                                    type="text" 
                                    aria-label="Search Bar" 
                                    name="Movie Title" 
                                    placeholder="Movie or TV show title" 
                                    autoComplete="off" 
                                    onChange={updateSearchTitleOnChange} 
                                    value={searchTitle}/>
                            <span ref={enterTitleMessageRef} className={`${isSearchBarEmpty ? 'opacity-1' : 'opacity-0'} absolute z-50 block w-fit inset-0 mr-auto ml-auto mt-auto h-fit -mb-8 md:mb-[-36px] px-2 md:px-4 py-1 text-[8px] min-[375px]:text-xs md:text-sm bg-zinc-900 font-normal leading-wide text-slate-50 rounded-full transition-opacity`}>Please enter a title to search.</span>
                        </fieldset> 

                        {!isEmptySearchBar && suggestions.length > 0 && <Suggestions suggestions={suggestions} />}
                    </form>

                    <Link className="nav-link static md:font-light" to="../watchlist">My watchlist</Link>
            </nav> 
        </header>
    )
}