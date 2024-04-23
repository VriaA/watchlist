import { Link } from 'react-router-dom'
import { TPosterProps } from '../../types/resultTypes'
import imageBaseUrl from '../../utils/imageBaseUrl'

export default function Poster({ result }: TPosterProps) {
    const { id, media_type, type, name, original_name, title, original_title, poster_path } = result
    
    return (
        <Link to={`/${media_type || type}/${id}`} className="group grid z-[5] card min-h-[245px] lg:w-[242px] lg:h-[350px] flex-none overflow-hidden cursor-pointer rounded-md snap-start">
            <span className="inline-block col-start-1 row-start-1 z-[2] min-h-[245px] lg:w-[242px] lg:h-[350px] flex-none bg-zinc-800/60 animate-pulse"></span>
            <img className="inline-block col-start-1 row-start-1 z-[3] w-full h-full object-cover object-center" src={`${imageBaseUrl}${poster_path}`} alt={`${(name || original_name) || (title || original_title)}`} />
            <span className="card film-name-poster min-h-[245px] lg:w-[242px] lg:h-[350px]">
                {(name || original_name) || (title || original_title)}
            </span>
        </Link>
    )
}