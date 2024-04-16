import { FormEvent, useState, ChangeEvent  } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Home():JSX.Element {
    const [searchTitle, setSearchTitle] = useState<string>('')
    const navigate = useNavigate()

    function manageSearchBar(e: ChangeEvent) {
        const searchBar = e.target as HTMLInputElement
        setSearchTitle(searchBar.value)
    }

    function handleFormSubmit(e: FormEvent): void {
        e.preventDefault()

        const title: string = searchTitle.trim().replace('&', '&26%')
        if(searchTitle.trim().split('').length > 0) {
            navigate(`search`, {state: title})
        } else {
            console.log('nothing to see here')
        }
    }
    

    return (
        <main className="flex-1 flex flex-col justify-center items-center">
            <Link to="/" className="font-medium text-4xl px-2 text-center md:text-7xl uppercase mb-3 md:mb-9">
                <h1>Find your film</h1>
            </Link>
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
                    onChange={manageSearchBar}
                    value={searchTitle} />
            </form>
        </main> 
    )
}