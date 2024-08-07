import { Link } from "react-router-dom";
import { TPosterProps } from "../../types/resultTypes";
import imageBaseUrl from "../../utils/imageBaseUrl";

export default function Poster({ result, index }: TPosterProps) {
  const {
    id,
    media_type,
    type,
    name,
    original_name,
    title,
    original_title,
    poster_path,
  } = result;

  const filmName: string = name || original_name || title || original_title;
  const filmType: string = media_type || type;
  return (
    <Link
      to={`/${filmType}/${filmName.toLowerCase()}+${id}`}
      className='group card flex-none overflow-hidden cursor-pointer rounded-md snap-start'
    >
      <div className={`${index <= 2 ? "poster-gsap translate-y-64 opacity-0" : ''} grid min-h-[245px] lg:w-[242px] lg:h-[350px]`}>
        <span className="inline-block col-start-1 row-start-1 z-[2] min-h-[245px] lg:w-[242px] lg:h-[350px] flex-none bg-zinc-800/60 animate-pulse"></span>
        <img
          className="inline-block col-start-1 row-start-1 z-[3] w-full h-full object-cover object-center"
          src={`${imageBaseUrl}${poster_path}`}
          alt={`${filmName}`}
        />
        <p className="card film-name-poster min-h-[245px] lg:w-[242px] lg:h-[350px]">
          {filmName}
        </p>
      </div>
    </Link>
  );
}
