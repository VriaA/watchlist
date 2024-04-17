import { useContext } from "react"
import EmptyPoster from "./EmptyPoster"
import Poster from "./Poster"
import { ResultsContext } from "../../contexts/ResultsContext"
import { TResults, TResult } from "../../types/resultTypes"
import Loader from "../loader/loader"

export default function FilmResults(): JSX.Element {
    const results = useContext(ResultsContext) as TResults

    const isFilmPosters = results && Array.isArray(results) && results.length > 0
    const isErrorMessage = results && (typeof results === 'string')
    return (
        <>
            {isFilmPosters ?  
                <>
                    <div id="back-btn" className="cursor-pointer">
                        <span id="results-left-arrow" className="left-arrow material-symbols-outlined hidden lg:inline-block text-5xl md:text-7xl font-light" data-arrow="results">
                            keyboard_arrow_left
                        </span>
                    </div>

                    <div id="gallery-results" className="grid z-20 gallery min-w-full h-full lg:pl-2 lg:min-w-[248px] lg:max-w-[66%] rounded-md overflow-x-scroll overflow-y-auto lg:overflow-y-hidden" data-gallery="results">
                        <div className="films cards-cntr w-full h-full grid grid-cols-2 md:grid-cols-3 lg:flex ${results.length > 2 ? 'justify-center' : ''} lg:justify-start gap-2 md:gap-5 md:mb-5 lg:mb-0 lg:py-5">
                            {results.map((result: TResult, i: number)=>  result.poster_path ? <Poster key={i} result={result} /> : <EmptyPoster key={i} result={result} />)}
                        </div>
                    </div>

                    <div id="results-right-arrow" className="cursor-pointer">
                        <span className=" right-arrow hidden lg:inline-block material-symbols-outlined text-5xl md:text-7xl font-light" data-arrow="results">
                            keyboard_arrow_right
                        </span>
                    </div>
                </>

            : isErrorMessage ?
                <div className="flex flex-col items-center text-center gap-2">
                    <p className="text-base font-semibold">{results}</p>
                    <span className="material-symbols-outlined text-5xl font-medium">error</span>
                </div>

            : <Loader />
            }
        </>
    )
}
