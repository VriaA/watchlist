import { TResult } from "../../types/resultTypes"
import Poster from "./Poster"

export default function Suggestion({suggestion}: {suggestion: TResult}) {
    const {id, media_type, title, name, first_air_date, release_date, poster_path} = suggestion
    const date = first_air_date || release_date
    const filmTitle = title || name

    return  (
                <li className="max-w-[90%] flex gap-2 text-xs md:text-sm"
                    title="Suggestion">
                    <Poster poster={poster_path} id={id} type={media_type} />
                    <div className="flex flex-col gap-1 justify-center items-start">
                    <h3 className="font-normal hover:underline cursor-pointer">{filmTitle} {date ? `(${date.split('-')[0]})` : ''}</h3>
                    <p className="px-2 py-1 text-[10px] md:text-xs font-light bg-zinc-900/40 border rounded-md">
                        {media_type === 'movie' ? 'Movie' : 'Series'}
                    </p>
                    </div>
                </li>
            )
}