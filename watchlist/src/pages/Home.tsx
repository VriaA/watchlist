import { FormEvent, useState, ChangeEvent, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Home():JSX.Element {
    const [searchTitle, setSearchTitle] = useState<string>('')
    const [isSearchBarEmpty, setIsSearchBarEmpty] = useState<boolean>(false)
    const navigate = useNavigate()
    const enterTitleMessageRef = useRef<HTMLSpanElement>(null)

    useEffect(()=> {
        if(!isSearchBarEmpty) return
            const clearMessage: NodeJS.Timeout = setTimeout(()=> hideEnterTitleMessage() , 4000)
            return ()=> clearTimeout(clearMessage)
    }, [isSearchBarEmpty])

    useEffect(()=> {
        searchTitle && hideEnterTitleMessage()
    }, [searchTitle])

    function hideEnterTitleMessage() {
        if(enterTitleMessageRef.current && enterTitleMessageRef.current.classList.contains('opacity-1')) {
            enterTitleMessageRef.current.classList.remove('opacity-1')
            enterTitleMessageRef.current.classList.add('opacity-0')
            setIsSearchBarEmpty(false)
        }
    }

    function updateSearchTitleOnChange(e: ChangeEvent) {
        const searchBar = e.target as HTMLInputElement
        setSearchTitle(searchBar.value)
    }

    function handleFormSubmit(e: FormEvent): void {
        e.preventDefault()

        const title: string = searchTitle.toLowerCase().trim().replace('&', '&26%')
        const isEmptySearchBar = searchTitle.trim().split('').length <= 0

        if(!isEmptySearchBar) {
            setIsSearchBarEmpty(false)
            navigate(`search`, {state: title})
        } else {
            setIsSearchBarEmpty(true)
        }
    }
    
    return (
        <div className="flex-1 flex flex-col justify-center items-center">
            <Link to="/" className="font-medium text-4xl px-2 text-center md:text-7xl uppercase mb-3 md:mb-9">
                <h1>Find your film</h1>
            </Link>
            <Link className="nav-link" to="watchlist">My watchlist</Link>

            <main className='relative flex justify-center w-full'>
                <form 
                    className="relative flex justify-end w-[68%] lg:w-[35%] h-10 bg-zinc-900/40 rounded-full overflow-hidden border border-stone-900/30"
                    onSubmit={handleFormSubmit} >
                    <span className="material-symbols-outlined absolute inset-0 my-auto w-fit h-fit left-2 z-50 self-center text-2xl md:text-3xl font-extralight">
                        search
                    </span>
                    <input 
                        className="w-full h-full px-10 text-[10px] min-[375px]:text-sm md:text-base bg-transparent outline-none text-center border-none" 
                        type="text" 
                        aria-label="Search Bar" 
                        name="Movie Title" 
                        placeholder="Movie or TV show title" 
                        autoComplete="off"
                        onChange={updateSearchTitleOnChange}
                        value={searchTitle} 
                    />
                </form>
                <span ref={enterTitleMessageRef} className={`${isSearchBarEmpty ? 'opacity-1' : 'opacity-0'} absolute -bottom-8 md:-bottom-10 mt-2 px-2 md:px-4 py-1 text-[10px] min-[375px]:text-sm md:text-base bg-zinc-900 font-normal leading-wide text-slate-50 rounded-full transition-opacity`}>Please enter a title to search.</span>
            </main>
        </div> 
    )
}