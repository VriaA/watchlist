import { useRef } from "react"
import { Link } from "react-router-dom"

export default function Header() {
    const searchFieldRef = useRef<HTMLFieldSetElement | null>(null)

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

                    <form className="relative h-10 min-w-[38px] cursor-pointer" title="Search">
                    
                        <button onClick={toggleSearchBarVisibility} type="button" className="absolute inset-0 my-auto left-2 z-50 w-fit h-fit transition-transform hover:-translate-y-1 active:translate-y-1">
                            <span className="material-symbols-outlined text-3xl font-light md:font-extralight">
                                search 
                            </span> 
                        </button>

                        <fieldset ref={searchFieldRef} className="hidden relative w-1 h-full px-2 z-20 bg-zinc-900/30 backdrop-blur-md rounded-2xl overflow-hidden border border-stone-900/30">
                            <input className="w-full h-full ml-2 px-10 font-light bg-transparent text-[10px] min-[375px]:text-sm md:text-base caret-slate-100 outline-none border-none" 
                                    type="text" aria-label="Search Bar" name="Movie Title" placeholder="Movie or TV show title" autoComplete="off" />
                        </fieldset> 
                        <ul id="suggestions" className="to-hide films search-suggestions invisible z-10">
                        </ul>   
                    </form>

                    <Link className="nav-link static md:font-light" to="../watchlist">My watchlist</Link>
            </nav> 
        </header>
    )
}