export default function Header() {
    return (
        <header className="absolute flex justify-end items-center gap-4 w-full p-[4%] md:p-[2%] lg:snap-start">
                        
            <nav className="flex justify-end items-center gap-4">

                    <form id="search-bar" className="relative h-10 min-w-[38px] cursor-pointer" title="Search">
                    
                        <span id="search-icon" className="material-symbols-outlined absolute inset-0 my-auto left-2 z-50 w-fit h-fit text-3xl font-light md:font-extralight transition-transform hover:-translate-y-1 active:translate-y-1">
                            search 
                        </span> 

                        <fieldset id="search-fieldset" className="hidden relative w-1 h-full px-2 z-20 bg-zinc-900/30 backdrop-blur-md rounded-2xl overflow-hidden border border-stone-900/30">
                                <input id="search-input" className="w-full h-full ml-2 px-10 font-light bg-transparent text-[10px] min-[375px]:text-sm md:text-base caret-slate-100 outline-none border-none" 
                                                        type="text" aria-label="Search Bar" name="Movie Title" placeholder="Movie or TV show title" autoComplete="off" />
                        </fieldset> 
                        <ul id="suggestions" className="to-hide films search-suggestions invisible z-10">
                        </ul>   
                    </form>

                    <a className="nav-link static md:font-light" href="#/watchlist">
                        My watchlist
                    </a>
            </nav> 
        </header>
    )
}