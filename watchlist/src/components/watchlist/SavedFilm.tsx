
import { DocumentData, deleteDoc, doc, updateDoc } from "firebase/firestore";
import SavedFilmPoster from "./SavedFilmPoster";
import FilmType from "../FilmType";
import { Link } from "react-router-dom"
import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../contexts/AppContext";
import { TAppContext } from "../../types/appTypes";
import { db } from "../../firebase";

export default function SavedFilm({ film }: { film: DocumentData }): JSX.Element {
    const { setDialog, openDialog, setLoading } = useContext(AppContext) as TAppContext
    const { iswatched, filmId, filmType, name, runtime, year, docId } = film
    const [isFilmMenuOpen, setIsFilmMenuOpen] = useState<boolean>(false)
    const filmRef = useRef<HTMLElement | null>(null)
    const filmMenuRef = useRef<HTMLUListElement | null>(null)

    const toggleFilmMenu = () => setIsFilmMenuOpen(prev => !prev)

    useEffect(() => {
        if (filmMenuRef.current && isFilmMenuOpen) {
            const firstButton = filmMenuRef.current.querySelector('button')
            firstButton && firstButton.focus()
        }
    }, [filmMenuRef, isFilmMenuOpen])

    useEffect(() => {
        if (!filmRef.current) return
        function closeOnClickOutside(e: MouseEvent): void {
            const clickedElement = e.target as HTMLElement
            if (!filmRef.current?.contains(clickedElement)) {
                setIsFilmMenuOpen(() => false)
            }
        }

        document.addEventListener('click', closeOnClickOutside)
        return () => document.removeEventListener('click', closeOnClickOutside)
    }, [filmRef])

    function removeFromWatchlist(): void {
        setLoading(() => true)
        try {
            deleteDoc(doc(db, 'watchlist', docId))
        } catch (error: any) {
            setDialog((prev) => ({ ...prev, message: error.message }))
            openDialog()
        } finally {
            setLoading(() => false)
        }
    }

    function toggleIsWatched() {
        setLoading(() => true)
        try {
            updateDoc(doc(db, 'watchlist', docId), {
                iswatched: !iswatched
            })
        } catch (error: any) {
            setDialog((prev) => ({ ...prev, message: error.message }))
            openDialog()
        } finally {
            setLoading(() => false)
        }
    }

    return (
        <section ref={filmRef} className="relative z-10 pb-2 bg-zinc-800/20 font-robotoCondensed font-normal lg:font-light text-xs md:text-sm backdrop-blur-md rounded-md overflow-hidden">
            {
                iswatched &&
                <div className="absolute top-2 left-2 z-50" aria-label={`${name} marked as watched`}>
                    <svg className="w-5 lg:w-6 aspect-square drop-shadow-blackOutline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" aria-hidden={true}>
                        <path fill="#f8fafc" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
                    </svg>
                </div>
            }

            <div className="relative z-40 text-base lg:text-lg">

                <SavedFilmPoster film={film} />

                {isFilmMenuOpen &&
                    <ul id={`film-menu-${filmId}`}
                        ref={filmMenuRef}
                        role="menu"
                        aria-label={`${name} menu`}
                        className="absolute bottom-0 right-0 p-2 flex flex-col gap-2 bg-zinc-900 rounded-tl-md z-50">
                        <li className="group cursor-pointer">
                            <button
                                onClick={removeFromWatchlist}
                                type="button"
                                autoFocus={true}
                                className="flex items-center gap-1 px-[2px] group-hover:text-red-700 focus:border-[1px] focus:border-red-700 focus:outline-none rounded">
                                Remove
                                <svg className="w-3 lg:w-[14px] aspect-square" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" aria-hidden={true}>
                                    <path fill="#b91c1c" d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
                                </svg>
                            </button>
                        </li>

                        <li className="group">
                            <button
                                onClick={toggleIsWatched}
                                type="button"
                                className={`${iswatched ? 'group-hover:text-amber-500' : 'group-hover:text-green-500'} flex items-center gap-1 px-[2px] focus:border-[1px] focus:border-green-500 focus:outline-none rounded cursor-pointer`}>
                                {iswatched ? 'Not watched' : 'Watched'}
                                {iswatched ?
                                    <svg className="w-3 lg:w-[14px] aspect-square" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" aria-hidden={true}>
                                        <path fill="#f59e0b " d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" />
                                    </svg>
                                    :
                                    <svg className="w-3 lg:w-[14px] aspect-square" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" aria-hidden={true}>
                                        <path fill="#22c55e" d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z" />
                                    </svg>
                                }
                            </button>
                        </li>
                    </ul>
                }
            </div>

            <div className="flex flex-col gap-1 px-2 py-4">
                <div className="relative flex justify-between items-center">
                    <Link to={`/${filmType}/${name}+${filmId}`} className="w-4/5 h-5 lg:h-6 line-clamp-1">
                        <h2 className="w-full h-full text-sm lg:text-base font-semibold lg:font-normal overflow-hidden cursor-pointer">
                            {name}
                        </h2>
                    </Link>
                    <button
                        type="button"
                        className="absolute self-center right-0 flex items-center text-xl font-semibold cursor-pointer"
                        aria-haspopup="true"
                        aria-label={`${isFilmMenuOpen ? 'Close' : 'Open'} ${name} menu`}
                        aria-expanded={isFilmMenuOpen}
                        aria-controls={`film-menu-${filmId}`}
                        onClick={toggleFilmMenu}>
                        &#8943;
                    </button>
                </div>

                <div className="flex justify-between items-center gap-2">
                    <div className="flex items-center gap-2">
                        <p>{year}</p>
                        <span className="text-[8px] lg:text-[10px]">&#9679;</span>
                        <p>{runtime} mins</p>
                    </div>
                    <p className="px-2 py-[2px] bg-zinc-900/40 backdrop-blur-sm border rounded-md">{FilmType(filmType)}</p>
                </div>
            </div>
        </section>
    )
}