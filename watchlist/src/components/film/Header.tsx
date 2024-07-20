import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import useSearch from "../../hooks/useSearch";
import Suggestions from "../searchSuggestions/Suggestions";
import WatchlistUser from "../WatchlistUser";

export default function Header() {
    const searchFieldRef = useRef<HTMLFieldSetElement | null>(null);
    const {
        searchTitle,
        updateSearchTitleOnChange,
        handleSearchFormSubmit,
        suggestions,
        isSearchBarEmpty,
        isSuggestionsOpen,
        isTitleMessageVisible,
        setIsSuggestionsOpen,
    } = useSearch();
    const navigate = useNavigate();

    function toggleSearchBarVisibility() {
        const isPC = window.innerWidth >= 1024;
        const searchField = searchFieldRef.current;
        if (!searchField) return;
        searchField.classList.toggle("hidden");
        searchField.style.width = isPC ? "500px" : "250px";
    }

    return (
        <header className="absolute flex justify-end items-center gap-4 w-full p-[4%] md:p-[2%] lg:snap-start">
            <nav className="flex justify-end items-center gap-4 md:gap-6">
                <form
                    className="relative h-10 min-w-[38px] cursor-pointer"
                    title="Search"
                    onSubmit={(e) => handleSearchFormSubmit(e, navigate)}
                >
                    <button
                        onClick={toggleSearchBarVisibility}
                        type="button"
                        className="absolute inset-0 my-auto left-2 z-50 w-fit h-fit transition-transform hover:-translate-y-1 active:translate-y-1"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="30px"
                            viewBox="0 -960 960 960"
                            width="30px"
                            fill="#f8fafc"
                        >
                            <path d="M781.69-136.92 530.46-388.16q-30 24.77-69 38.77-39 14-80.69 14-102.55 0-173.58-71.01-71.03-71.01-71.03-173.54 0-102.52 71.01-173.6 71.01-71.07 173.54-71.07 102.52 0 173.6 71.03 71.07 71.03 71.07 173.58 0 42.85-14.38 81.85-14.39 39-38.39 67.84l251.23 251.23-42.15 42.16ZM380.77-395.38q77.31 0 130.96-53.66 53.66-53.65 53.66-130.96t-53.66-130.96q-53.65-53.66-130.96-53.66t-130.96 53.66Q196.15-657.31 196.15-580t53.66 130.96q53.65 53.66 130.96 53.66Z" />
                        </svg>
                    </button>

                    <fieldset
                        ref={searchFieldRef}
                        className="hidden relative w-1 h-full px-2 z-40 bg-zinc-900/30 backdrop-blur-md rounded-2xl overflow-hidden border border-stone-900/30"
                    >
                        <input
                            className="w-full h-full ml-2 px-10 font-light bg-transparent text-[10px] min-[375px]:text-sm md:text-base caret-slate-100 outline-none border-none"
                            type="text"
                            aria-label="Search Bar"
                            name="Movie Title"
                            placeholder="Movie or TV show title"
                            autoComplete="off"
                            onChange={updateSearchTitleOnChange}
                            value={searchTitle}
                        />
                    </fieldset>
                    <span
                        className={`${isTitleMessageVisible ? "opacity-1" : "opacity-0 hidden"} absolute z-50 block w-fit inset-0 mr-auto ml-auto mt-auto h-fit -mb-8 md:mb-[-36px] px-2 md:px-4 py-1 text-[8px] min-[375px]:text-xs md:text-sm bg-zinc-900 font-normal leading-wide text-slate-50 rounded-full transition-opacity`}
                    >
                        Please enter a title to search.
                    </span>

                    {!isSearchBarEmpty && isSuggestionsOpen && (
                        <Suggestions
                            suggestions={suggestions}
                            setIsSuggestionsOpen={setIsSuggestionsOpen}
                        />
                    )}
                </form>

                <Link className="nav-link static md:font-light" to="../watchlist">
                    My watchlist
                </Link>

                <WatchlistUser />
            </nav>
        </header>
    );
}
