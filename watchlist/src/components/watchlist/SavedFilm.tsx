
import { DocumentData } from "firebase/firestore";
import SavedFilmPoster from "./SavedFilmPoster";
import FilmType from "../FilmType";
import { Link } from "react-router-dom"

export default function SavedFilm({ film }: { film: DocumentData }): JSX.Element {
    const { iswatched, filmId, filmType, name, runtime, year } = film

    return (
        <section className="relative z-10 pb-2 bg-zinc-800/20 font-robotoCondensed font-normal lg:font-light text-xs md:text-sm backdrop-blur-md rounded-md overflow-hidden">
            {
                iswatched &&
                <div className="absolute top-2 left-2 z-50">
                    <svg className="w-5 lg:w-6 aspect-square drop-shadow-blackOutline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path fill="#f1f5f9" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
                    </svg>
                </div>
            }

            <div className="relative z-40 text-base lg:text-lg">

                <SavedFilmPoster film={film} />

                <ul className="to-hide invisible absolute bottom-0 right-0 p-2 flex flex-col gap-2 bg-zinc-900 rounded-tl-md z-50">
                    <li className="flex items-center gap-1 cursor-pointer hover:text-red-700">
                        Remove <i className="fa-regular fa-trash-can text-xs lg:text-sm text-red-700"></i>
                    </li>

                    <li className="flex items-center gap-1">
                        <label htmlFor={`watch-status-checkbox-${filmId}`} className={`${iswatched ? 'hover:text-amber-500' : 'hover:text-green-700'} cursor-pointer`}>
                            {iswatched ? 'Not watched' : 'Watched'}
                            {iswatched ?
                                <svg className="w-3 lg:w-[14px] aspect-square" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path fill="#f59e0b " d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" />
                                </svg>
                                :
                                <svg className="w-3 lg:w-[14px] aspect-square" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path fill="#15803d" d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z" />
                                </svg>
                            }
                        </label>
                        <input id={`watch-status-checkbox-${filmId}`} className="watch-status hidden" type="checkbox" checked={iswatched ? true : false} />
                    </li>
                </ul>
            </div>

            <div className="flex flex-col gap-1 px-2 py-4">
                <div className="relative flex justify-between items-center">
                    <Link to={`/${filmType}/${name}+${filmId}`} className="w-4/5 h-5 lg:h-6 line-clamp-1">
                        <h2 className="w-full h-full text-sm lg:text-base font-semibold lg:font-normal overflow-hidden cursor-pointer">
                            {name}
                        </h2>
                    </Link>
                    <span className="absolute self-center right-0 flex items-center text-xl font-semibold cursor-pointer">
                        &#8943;
                    </span>
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