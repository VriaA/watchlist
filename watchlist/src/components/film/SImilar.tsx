import { TSimilarObj, TSimilar } from "../../types/filmTypes"
import imageBaseUrl from "../../utils/imageBaseUrl"
import useScroll from "../../hooks/useScroll"

export default function Similar({similar}: {similar: TSimilarObj}) {
    const { galleryRef, leftArrowRef, rightArrowRef, changeArrowOpacity, scrollLeft, scrollRight} = useScroll()
    const hasSimilarFilm = similar.results.length > 0

    function SimilarFilmPosterWithImage({filmName, posterPath}: {filmName: string, posterPath: string}): JSX.Element {

        return (
            <span className="card card-similar group grid z-[5] w-[49%] min-h-[245px] lg:w-[242px] lg:h-[350px] flex-none overflow-hidden cursor-pointer rounded-md snap-start">
                <span className="inline-block col-start-1 row-start-1 z-[2] min-h-[245px] lg:w-[242px] lg:h-[350px] flex-none bg-zinc-800/60 animate-pulse">
                </span>
                <img className="inline-block col-start-1 row-start-1 z-[3] w-full h-full object-cover object-center" src={`${imageBaseUrl}${posterPath}`} alt={filmName} loading="lazy" />
                <p className="card film-name-poster min-h-[245px] lg:w-[242px] lg:h-[350px]">
                    {filmName}
                </p>
            </span>
        )
    }

    function SimilarFilmPosterWithoutImage({filmName}: {filmName: string}) {
        return (
            <span className="card card-similar relative w-[49%] min-h-[245px] lg:w-[242px] lg:h-[350px] no-poster" >
                <span className="absolute inset-0 m-auto h-fit w-fit material-symbols-outlined text-5xl lg:text-7xl text-white font-thin" >
                    broken_image
                </span>
                <p className="text-xs lg:text-sm capitalise font-normal p-2">
                    {filmName}
                </p>
            </span>
        )
    }

    function SimilarFilmPoster(): JSX.Element[] {
        return  similar.results.map((film: TSimilar, i:number)=> {
        const {name, original_name, original_title, title, poster_path} = film
        const filmName: string = name || original_name || title || original_title

           return film.poster_path ? <SimilarFilmPosterWithImage filmName={filmName} posterPath={poster_path} key={i} /> : <SimilarFilmPosterWithoutImage filmName={filmName} key={i}/>      
        })
    }

    function NoSimilarFilmMessage(): JSX.Element {
        return (
                <p className="card-similar w-full h-full text-lg lg:text-xl font-light text-center">
                    No similar film.
                </p>
            )
    }

    return (
        <section className="flex items-center lg:h-[90svh] px-[2%] lg:snap-start">

            <h2 className="relative w-[30%] text-3xl md:text-6xl font-robotoCondensed font-normal">
                Similar
                <span className="gallery-title-underline-similar block mt-1 border-b"></span>
            </h2>

            <div className="w-[70%] gallery-cntr hide-film-gallery" data-gallery="similar">

                {hasSimilarFilm &&
                    <div className="arrows-similar flex justify-end items-end gap-3 pl-4">
                        <button ref={leftArrowRef} onClick={scrollLeft} title="Previous">
                            <span id="similar-left-arrow" className="material-symbols-outlined left-arrow scroll-arrow-small">
                                keyboard_arrow_left
                            </span>
                        </button>

                        <button ref={rightArrowRef} onClick={scrollRight} title="Next">
                            <span id="similar-right-arrow" className="material-symbols-outlined right-arrow scroll-arrow-small">
                                keyboard_arrow_right
                            </span>
                        </button>
                    </div> 
                }

                <div id="gallery-similar" className="gallery overflow-x-auto pl-2 md:px-4" ref={galleryRef} onScroll={changeArrowOpacity}>
                    <div className="films cards-cntr flex gap-2 md:gap-3 py-2">
                        {hasSimilarFilm ? <SimilarFilmPoster /> : <NoSimilarFilmMessage />}
                    </div>
                </div>
            </div> 
            
        </section>
    )
}