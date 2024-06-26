import { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useSearch from '../hooks/useSearch'
import WatchlistUser from '../components/WatchlistUser'

export default function Home(): JSX.Element {
    const navigate = useNavigate()
    const enterTitleMessageRef = useRef<HTMLSpanElement>(null)
    const { searchTitle, updateSearchTitleOnChange, isSearchBarEmpty, handleSearchFormSubmit } = useSearch(enterTitleMessageRef)

    return (
        <div className="w-[100svw] h-[100svh] page-wrapper bg-homeImg bg-wrapperImgPosition md:bg-wrapperImgPositionMd">
            <div className=" w-[100svw] h-[100svh] grid place-content-center">
                <div className="content-cntr overflow-y-auto lg:overflow-hidden">
                    <div className="flex-1 flex flex-col justify-center items-center">
                        <div className='absolute top-8 right-8 flex items-center gap-4 md:gap-6'>
                            <Link className="nav-link leading-none" to="watchlist">My watchlist</Link>
                            <WatchlistUser />
                        </div>

                        <Link to="/" className="font-medium text-4xl px-2 text-center md:text-7xl uppercase mb-3 md:mb-9">
                            <h1>Find your film</h1>
                        </Link>

                        <main className='relative flex justify-center w-full'>
                            <form
                                className="relative flex justify-end w-[68%] lg:w-[35%] h-10 bg-zinc-900/40 rounded-full overflow-hidden border border-stone-900/30"
                                onSubmit={(e) => handleSearchFormSubmit(e, navigate)} >
                                <span className="material-symbols-outlined absolute inset-0 my-auto w-fit h-fit left-2 z-50 self-center text-2xl md:text-3xl font-extralight">
                                    search
                                </span>
                                <input className="w-full h-full px-10 text-[10px] min-[375px]:text-sm md:text-base bg-transparent outline-none text-center border-none"
                                    type="text"
                                    aria-label="Search Bar"
                                    name="Movie Title"
                                    placeholder="Movie or TV show title"
                                    autoComplete="off"
                                    onChange={updateSearchTitleOnChange}
                                    value={searchTitle}
                                />
                            </form>
                            <span ref={enterTitleMessageRef} className={`${isSearchBarEmpty ? 'opacity-1' : 'opacity-0'} absolute -bottom-8 md:bottom-[-36px] mt-2 px-2 md:px-4 py-1 text-[8px] min-[375px]:text-xs md:text-sm bg-zinc-900 font-normal leading-wide text-slate-50 rounded-full transition-opacity`}>Please enter a title to search.</span>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    )
}