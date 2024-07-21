import { Link } from "react-router-dom";
import { TSimilarObj, TSimilar } from "../../types/filmTypes";
import imageBaseUrl from "../../utils/imageBaseUrl";
import useScroll from "../../hooks/useScroll";

export default function Similar({
  similar,
  type,
}: {
  similar: TSimilarObj;
  type: string;
}) {
  const {
    galleryRef,
    leftArrowRef,
    rightArrowRef,
    changeArrowOpacity,
    scrollLeft,
    scrollRight,
  } = useScroll();
  const hasSimilarFilm = similar.results.length > 0;

  function SimilarFilmPosterWithImage({
    filmName,
    posterPath,
    id,
    index
  }: {
    filmName: string;
    posterPath: string;
    id: number;
    index: number
  }): JSX.Element {

    return (
      <Link
        to={`../${type}/${filmName}+${id}`}
        className='card z-[5] w-[49%] min-h-[245px] lg:w-[242px] lg:h-[350px] flex-none overflow-hidden cursor-pointer rounded-md snap-start '>
        <div className={`card-similar group grid overflow-hidden ${index <= 3 ? 'translate-y-14 opacity-0' : ''}`}>
          <span className="inline-block col-start-1 row-start-1 z-[2] min-h-[245px] lg:w-[242px] lg:h-[350px] flex-none bg-zinc-800/60 animate-pulse"></span>
          <img
            className="inline-block col-start-1 row-start-1 z-[3] w-full h-full object-cover object-center"
            src={`${imageBaseUrl}${posterPath}`}
            alt={filmName}
            loading="lazy"
          />
          <p className="card film-name-poster min-h-[245px] lg:w-[242px] lg:h-[350px]">
            {filmName}
          </p>
        </div>

      </Link>
    );
  }

  function SimilarFilmPosterWithoutImage({
    filmName,
    id,
    index
  }: {
    filmName: string;
    id: number;
    index: number;
  }) {

    return (
      <Link
        to={`../${type}/${filmName}+${id}`}
        className='card flex-none w-[49%] min-h-[245px] lg:w-[242px] lg:h-[350px] snap-start rounded-md'
      >
        <div className={`card-similar relative h-full ${index <= 3 ? 'translate-y-14 opacity-0' : ''} no-poster`}>
          <svg
            className="absolute inset-0 m-auto w-12 h-12 lg:w-[72px] lg:h-[72px]"
            aria-label="No image"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            fill="#ffffff "
          >
            <path d="M224.62-160q-27.62 0-46.12-18.5Q160-197 160-224.62v-510.76q0-27.62 18.5-46.12Q197-800 224.62-800h510.76q27.62 0 46.12 18.5Q800-763 800-735.38v510.76q0 27.62-18.5 46.12Q763-160 735.38-160H224.62ZM240-428.54l160-160 160 160 160-160 40 40v-186.84q0-10.77-6.92-17.7-6.93-6.92-17.7-6.92H224.62q-10.77 0-17.7 6.92-6.92 6.93-6.92 17.7v266.84l40 40ZM224.62-200h510.76q10.77 0 17.7-6.92 6.92-6.93 6.92-17.7v-267.07l-40-40-160 160-160-160-160 160-40-40v187.07q0 10.77 6.92 17.7 6.93 6.92 17.7 6.92ZM200-200v-291.69 40V-760v560Z" />
          </svg>

          <p className="text-xs lg:text-sm capitalise font-normal p-2">
            {filmName}
          </p>
        </div>

      </Link>
    );
  }

  function SimilarFilmPoster(): JSX.Element[] {
    return similar.results.map((film: TSimilar, i: number) => {
      const { name, original_name, original_title, title, poster_path, id } =
        film;
      const filmName: string = name || original_name || title || original_title;

      return film.poster_path ? (
        <SimilarFilmPosterWithImage
          filmName={filmName}
          posterPath={poster_path}
          id={id}
          key={i}
          index={i}
        />
      ) : (
        <SimilarFilmPosterWithoutImage filmName={filmName} id={id} key={i} index={i} />
      );
    });
  }

  function NoSimilarFilmMessage(): JSX.Element {
    return (
      <p className="card-similar w-full h-full text-lg lg:text-xl font-light text-center translate-y-14 opacity-0">
        No similar film.
      </p>
    );
  }

  return (
    <section className="flex items-center lg:h-[90svh] px-[2%] lg:snap-start">
      <h2 className="relative w-[30%] text-3xl md:text-6xl font-robotoCondensed font-normal">
        Similar
        <span className="gallery-title-underline-similar block mt-1 border-b w-0"></span>
      </h2>

      <div className="w-[70%]">
        {hasSimilarFilm && (
          <div className="arrows-similar flex justify-end items-center gap-3 opacity-0">
            <button
              ref={leftArrowRef}
              onClick={scrollLeft}
              title="Scroll films left"
              aria-label="Scroll film left "
            >
              <svg
                className="hidden lg:inline-block cursor-pointer"
                aria-hidden={true}
                xmlns="http://www.w3.org/2000/svg"
                height="36px"
                viewBox="0 -960 960 960"
                width="36px"
                fill="#f8fafc"
              >
                <path d="M560.67-240 320-480.67l240.67-240.66L608-674 414.67-480.67 608-287.33 560.67-240Z" />
              </svg>
            </button>

            <button
              ref={rightArrowRef}
              onClick={scrollRight}
              title="Scroll films right"
              aria-label="Scroll film right"
            >
              <svg
                className="hidden lg:inline-block cursor-pointer"
                aria-hidden={true}
                xmlns="http://www.w3.org/2000/svg"
                height="36px"
                viewBox="0 -960 960 960"
                width="36px"
                fill="#f8fafc"
              >
                <path d="M521.33-480.67 328-674l47.33-47.33L616-480.67 375.33-240 328-287.33l193.33-193.34Z" />
              </svg>
            </button>
          </div>
        )}

        <div
          className="gallery overflow-x-auto pl-2 md:px-4 lg:snap-x lg:snap-mandatory"
          ref={galleryRef}
          onScroll={changeArrowOpacity}
        >
          <div className="films cards-cntr flex gap-2 md:gap-3 py-2" data-gallery="similar">
            {hasSimilarFilm ? <SimilarFilmPoster /> : <NoSimilarFilmMessage />}
          </div>
        </div>
      </div>
    </section>
  );
}
