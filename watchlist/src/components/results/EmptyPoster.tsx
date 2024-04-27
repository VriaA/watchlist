import { Link } from 'react-router-dom'
import { TPosterProps } from '../../types/resultTypes'

export default function EmptyPoster({ result }: TPosterProps): JSX.Element {
    const { id, media_type, type, name, original_name, title, original_title } = result

    const filmName: string = name || original_name || title || original_title
    const filmType: string = media_type||type
    return (
        <Link to={`/${filmType}/${filmName.toLowerCase()}+${id}`} className="card relative min-h-[245px] lg:w-[242px] lg:h-[350px] snap-start no-poster">
            <span className="absolute inset-0 m-auto h-fit w-fit material-symbols-outlined text-5xl lg:text-7xl text-white font-thin">
                broken_image
            </span>
            <p className="text-xs lg:text-sm capitalise font-normal p-2">
                {filmName}
            </p>
        </Link>
    )
}