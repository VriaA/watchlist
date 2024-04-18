import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header id="results-header" className="w-full h-fit grid grid-cols-3 grid-rows-2 lg:grid-cols-4 lg:grid-rows-1 items-center gap-2 md:gap-4 mt-4">

            <Link to="/" className="w-full col-start-1 col-end-3 lg:col-end-2 text-2xl lg:text-3xl font-medium text-slate-100 uppercase"><h1>Find your film</h1></Link>
                    
            <form id="search-bar" className="col-start-1 col-end-5 row-start-2 row-end-3 lg:col-start-2 lg:col-end-4 lg:row-start-1 lg:row-end-1 lg:justify-self-center relative w-full lg:max-w-[500px]">
                <span id="search-icon" className="material-symbols-outlined absolute inset-0 my-auto w-fit h-fit left-2 z-50 self-center text-2xl lg:text-3xl font-extralight">
                    search
                </span> 

                <fieldset className="relative z-40 flex justify-between h-10 bg-zinc-900/40 rounded-2xl overflow-hidden border border-stone-900/30">
                <input id="search-input" className="w-full h-full px-10 lg:pl-12 bg-transparent text-[10px] min-[375px]:text-sm lg:text-base text-center outline-none border-none" 
                                        type="text" aria-label="Search Bar" name="Movie Title" placeholder="Movie or TV show title" autoComplete="off" />
                </fieldset>
                <ul id="suggestions" className="to-hide films search-suggestions invisible z-30">
                </ul>                                           
            </form>

            <Link className="col-start-4 col-end-5 lg:col-start-4 lg:col-end-5 justify-self-end" to="#/watchlist">My watchlist</Link>
        </header> 
    )
}