import { useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import useSearch from "../../hooks/useSearch";
import Suggestions from "../searchSuggestions/Suggestions";
import WatchlistUser from "../WatchlistUser";

export default function Header(): JSX.Element {
    const enterTitleMessageRef = useRef<HTMLSpanElement>(null)
    const { searchTitle, updateSearchTitleOnChange, isSearchBarEmpty, handleSearchFormSubmit, suggestions, isEmptySearchBar } = useSearch(enterTitleMessageRef)
    const [searchParams, setSearchParams] = useSearchParams()

    return (
        <header className="w-full h-fit grid grid-cols-3 grid-rows-2 lg:grid-cols-4 lg:grid-rows-1 items-center gap-2 md:gap-4 mt-4">

            <Link to="/" className="w-full col-start-1 col-end-3 lg:col-end-2 text-2xl lg:text-3xl font-medium text-slate-100 uppercase"><h1>Find your film</h1></Link>

            <form className="col-start-1 col-end-5 row-start-2 row-end-3 lg:col-start-2 lg:col-end-4 lg:row-start-1 lg:row-end-1 lg:justify-self-center relative w-full lg:max-w-[500px]"
                onSubmit={(e) => handleSearchFormSubmit(e, undefined, setSearchParams)}>
                <span className="material-symbols-outlined absolute inset-0 my-auto w-fit h-fit left-2 z-50 self-center text-2xl lg:text-3xl font-extralight">
                    search
                </span>

                <fieldset className="relative z-40 flex justify-between h-10 bg-zinc-900/40 rounded-2xl overflow-hidden border border-stone-900/30">
                    <input className="w-full h-full px-10 lg:pl-12 bg-transparent text-[10px] min-[375px]:text-sm lg:text-base text-center outline-none border-none"
                        type="text"
                        aria-label="Search Bar"
                        name="Movie Title"
                        placeholder="Movie or TV show title"
                        autoComplete="off"
                        onChange={updateSearchTitleOnChange}
                        value={searchTitle}
                    />
                </fieldset>

                <span ref={enterTitleMessageRef} className={`${isSearchBarEmpty ? 'opacity-1' : 'opacity-0'} absolute z-50 block w-fit inset-0 mr-auto ml-auto mt-auto h-fit -mb-8 md:mb-[-36px] px-2 md:px-4 py-1 text-[8px] min-[375px]:text-xs md:text-sm bg-zinc-900 font-normal leading-wide text-slate-50 rounded-full transition-opacity`}>Please enter a title to search.</span>

                {!isEmptySearchBar && suggestions.length > 0 && <Suggestions suggestions={suggestions} />}
            </form>

            <div className="flex items-center gap-4 md:gap-6 col-start-4 col-end-5 lg:col-start-4 lg:col-end-5 justify-self-end">
                <Link className="nav-link" to="/watchlist">My watchlist</Link>
                <WatchlistUser />
            </div>
        </header>
    )
}