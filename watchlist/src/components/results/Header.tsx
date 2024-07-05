import { Link, useSearchParams } from "react-router-dom";
import useSearch from "../../hooks/useSearch";
import Suggestions from "../searchSuggestions/Suggestions";
import WatchlistUser from "../WatchlistUser";

export default function Header(): JSX.Element {
    const { searchTitle, updateSearchTitleOnChange, handleSearchFormSubmit, suggestions, isSuggestionsOpen, isSearchBarEmpty, setIsSuggestionsOpen, isTitleMessageVisible } = useSearch()
    const [searchParams, setSearchParams] = useSearchParams()

    return (
        <header className="w-full h-fit grid grid-cols-3 grid-rows-2 lg:grid-cols-4 lg:grid-rows-1 items-center gap-2 md:gap-4 mt-4">

            <Link to="/" className="w-full col-start-1 col-end-3 lg:col-end-2 text-2xl lg:text-3xl font-medium text-slate-100 uppercase"><h1>Find your film</h1></Link>

            <form className="col-start-1 col-end-5 row-start-2 row-end-3 lg:col-start-2 lg:col-end-4 lg:row-start-1 lg:row-end-1 lg:justify-self-center relative w-full lg:max-w-[500px]"
                onSubmit={(e) => handleSearchFormSubmit(e, undefined, setSearchParams)}>
                <svg className="self-center absolute inset-0 my-auto w-6 md:w-[30px] left-2 z-50" xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#f8fafc">
                    <path d="M781.69-136.92 530.46-388.16q-30 24.77-69 38.77-39 14-80.69 14-102.55 0-173.58-71.01-71.03-71.01-71.03-173.54 0-102.52 71.01-173.6 71.01-71.07 173.54-71.07 102.52 0 173.6 71.03 71.07 71.03 71.07 173.58 0 42.85-14.38 81.85-14.39 39-38.39 67.84l251.23 251.23-42.15 42.16ZM380.77-395.38q77.31 0 130.96-53.66 53.66-53.65 53.66-130.96t-53.66-130.96q-53.65-53.66-130.96-53.66t-130.96 53.66Q196.15-657.31 196.15-580t53.66 130.96q53.65 53.66 130.96 53.66Z" />
                </svg>
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

                <span className={`${isTitleMessageVisible ? 'opacity-1' : 'opacity-0'} absolute z-50 block w-fit inset-0 mr-auto ml-auto mt-auto h-fit -mb-8 md:mb-[-36px] px-2 md:px-4 py-1 text-[8px] min-[375px]:text-xs md:text-sm bg-zinc-900 font-normal leading-wide text-slate-50 rounded-full transition-opacity`}>Please enter a title to search.</span>

                {!isSearchBarEmpty && isSuggestionsOpen && <Suggestions suggestions={suggestions} setIsSuggestionsOpen={setIsSuggestionsOpen} />}
            </form>

            <div className="flex items-center gap-4 md:gap-6 col-start-4 col-end-5 lg:col-start-4 lg:col-end-5 justify-self-end">
                <Link className="nav-link" to="/watchlist">My watchlist</Link>
                <WatchlistUser />
            </div>
        </header>
    )
}