import { Link } from 'react-router-dom'
import { TResult } from "../../types/resultTypes"
import Poster from "./Poster"

export default function Suggestion({suggestion}: {suggestion: TResult}) {
    const {id, media_type, type, title, name, original_name, original_title, first_air_date, release_date, poster_path} = suggestion
    const date: string = first_air_date || release_date
    const filmName: string = title || original_title || name || original_name
    const filmType: string = media_type||type
    return  (
                <li title="Suggestion">
                    <Link to={`/${filmType}/${filmName.toLowerCase()}+${id}`} className="max-w-[90%] flex gap-2 text-xs md:text-sm">
                        <Poster poster={poster_path} />
                        <div className="flex flex-col gap-1 justify-center items-start">
                        <h3 className="font-normal hover:underline cursor-pointer">{filmName} {date ? `(${date.split('-')[0]})` : ''}</h3>
                        <p className="px-2 py-1 text-[10px] md:text-xs font-light bg-zinc-900/40 border rounded-md">
                            {filmType === 'movie' ? 'Movie' : 'Series'}
                        </p>
                        </div>
                    </Link>
                </li>
            )
}