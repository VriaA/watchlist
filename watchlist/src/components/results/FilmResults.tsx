import { useContext, useEffect } from "react";
import EmptyPoster from "./EmptyPoster";
import Poster from "./Poster";
import { ResultsContext } from "../../contexts/ResultsContext";
import { TResults, TResult } from "../../types/resultTypes";
import Loader from "../loader/loader";
import useScroll from "../../hooks/useScroll";
import ErrorMessage from "../ErrorMessage";

export default function FilmResults(): JSX.Element {
  const results = useContext(ResultsContext) as TResults;
  const isFilmPosters = results && Array.isArray(results) && results.length > 0;
  const isErrorMessage = results && typeof results === "string";
  const {
    galleryRef,
    leftArrowRef,
    rightArrowRef,
    changeArrowOpacity,
    scrollLeft,
    scrollRight,
  } = useScroll();

  useEffect(() => changeArrowOpacity(), [results]);

  return (
    <>
      {isFilmPosters ? (
        <main className="flex-1 relative z-20 flex items-center justify-center mt-6 lg:pt-0 lg:mt-[2%]">
          <button
            ref={leftArrowRef}
            onClick={scrollLeft}
            title="Scroll left"
            aria-label="Scroll left"
          >
            <svg
              className="hidden lg:inline-block cursor-pointer"
              aria-hidden={true}
              xmlns="http://www.w3.org/2000/svg"
              height="72px"
              viewBox="0 -960 960 960"
              width="72px"
              fill="#f8fafc"
            >
              <path d="M560.67-240 320-480.67l240.67-240.66L608-674 414.67-480.67 608-287.33 560.67-240Z" />
            </svg>
          </button>

          <div
            className="gallery z-20 grid min-w-full h-full lg:pl-2 lg:min-w-[248px] lg:max-w-[66%] rounded-md overflow-x-scroll overflow-y-auto lg:overflow-y-hidden lg:snap-x lg:snap-mandatory"
            ref={galleryRef}
            onScroll={changeArrowOpacity}
          >
            <div className="films cards-cntr w-full min-h-full grid grid-cols-2 md:grid-cols-3 lg:flex ${results.length > 2 ? 'justify-center' : ''} lg:justify-start lg:items-center gap-2 md:gap-5 md:mb-5 lg:mb-0 lg:py-5">
              {results.map((result: TResult, i: number) =>
                result.poster_path ? (
                  <Poster key={i} result={result} />
                ) : (
                  <EmptyPoster key={i} result={result} />
                ),
              )}
            </div>
          </div>

          <button
            ref={rightArrowRef}
            onClick={scrollRight}
            title="Scroll left"
            aria-label="Scroll left"
          >
            <svg
              className="hidden lg:inline-block cursor-pointer"
              aria-hidden={true}
              xmlns="http://www.w3.org/2000/svg"
              height="72px"
              viewBox="0 -960 960 960"
              width="72px"
              fill="#f8fafc"
            >
              <path d="M521.33-480.67 328-674l47.33-47.33L616-480.67 375.33-240 328-287.33l193.33-193.34Z" />
            </svg>
          </button>
        </main>
      ) : isErrorMessage ? (
        <ErrorMessage message={results} />
      ) : (
        <Loader />
      )}
    </>
  );
}
