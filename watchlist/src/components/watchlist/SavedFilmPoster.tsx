import { DocumentData } from "firebase/firestore"
import { Link } from "react-router-dom"

export default function SavedFilmPoster({ film }: { film: DocumentData }): JSX.Element {

    const { poster, name, filmType, filmId } = film

    return (
        <>
            {
                poster ?
                    <Link to={`/${filmType}/${name}+${filmId}`} className="grid grid-cols-1 grid-rows-1 min-h-[200px]">
                        <img className="col-start-1 row-start-1 z-[8]  h-full object-cover object-center rounded-t-md cursor-pointer" src={poster} alt={name} title={name} loading="lazy"></img>
                        <span className="block col-start-1 row-start-1 z-[7] h-full bg-zinc-900/40 animate-pulse"></span>
                    </Link>
                    :
                    <Link to={`/${filmType}/${name}+${filmId}`} className="flex items-center justify-center min-h-[200px] bg-zinc-800/40 cursor-pointer">
                        <span className="material-symbols-outlined text-5xl lg:text-7xl font-thin">
                            broken_image
                        </span>
                    </Link>
            }
        </>
    )
}