import { useContext } from "react"
import EmptyPoster from "./EmptyPoster"
import Poster from "./Poster"
import { ResultsContext } from "../../contexts/ResultsContext"
import { TResults, TResult } from "../../types/resultTypes"
import Loader from "../loader/loader"
import useScroll from "../../hooks/useScroll"

export default function FilmResults(): JSX.Element {
    const results = useContext(ResultsContext) as TResults
    const isFilmPosters = results && Array.isArray(results) && results.length > 0
    const isErrorMessage = results && (typeof results === 'string')
    const { galleryRef, leftArrowRef, rightArrowRef, changeArrowOpacity, scrollLeft, scrollRight} = useScroll()

    return (
        <>
            {isFilmPosters ?
                <main className="flex-1 relative z-20 flex items-center justify-center mt-6 lg:pt-0 lg:mt-[2%]">
                    <button ref={leftArrowRef} onClick={scrollLeft}>
                        <span className="left-arrow material-symbols-outlined hidden lg:inline-block text-5xl md:text-7xl font-light cursor-pointer">
                            keyboard_arrow_left
                        </span>
                    </button>

                    <div className="gallery z-20 grid min-w-full h-full lg:pl-2 lg:min-w-[248px] lg:max-w-[66%] rounded-md overflow-x-scroll overflow-y-auto lg:overflow-y-hidden" ref={galleryRef} onScroll={changeArrowOpacity}>
                        <div className="films cards-cntr w-full min-h-full grid grid-cols-2 md:grid-cols-3 lg:flex ${results.length > 2 ? 'justify-center' : ''} lg:justify-start lg:items-center gap-2 md:gap-5 md:mb-5 lg:mb-0 lg:py-5">
                            {results.map((result: TResult, i: number)=>  result.poster_path ? <Poster key={i} result={result} /> : <EmptyPoster key={i} result={result} />)}
                        </div>
                    </div>

                    <button ref={rightArrowRef} onClick={scrollRight}>
                        <span className="right-arrow hidden lg:inline-block material-symbols-outlined text-5xl md:text-7xl font-light">
                            keyboard_arrow_right
                        </span>
                    </button>
                </main>

            : isErrorMessage ?
                <div className="flex-1 flex flex-col items-center justify-center text-center gap-2">
                    <p className="text-base font-semibold">{results}</p>
                    <span className="material-symbols-outlined text-5xl font-medium">error</span>
                </div>

            : <Loader />
            }
        </>
    )
}
