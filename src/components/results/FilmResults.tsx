import { useContext, useEffect } from "react";
import EmptyPoster from "./EmptyPoster";
import Poster from "./Poster";
import { ResultsContext, TResultsContext } from "../../contexts/ResultsContext";
import { TResult } from "../../types/resultTypes";
import Loader from "../loader/loader";
import useScroll from "../../hooks/useScroll";
import ErrorMessage from "../ErrorMessage";
import { Power0 } from "gsap";
import { useGSAP } from "@gsap/react";

export default function FilmResults(): JSX.Element {
  const { results, gsapTl } = useContext(ResultsContext) as TResultsContext;
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

  useGSAP(() => {
    if (!gsapTl || results.length <= 0) return
    gsapTl.to('.poster-gsap', { y: 0, opacity: 1, duration: .5, ease: Power0.easeIn, stagger: .2, zIndex: 10 })
    gsapTl.to('.arrow-gsap', { opacity: .2, duration: .5, ease: "sine.in" })
    gsapTl.to('.arrow-gsap', { opacity: 1, duration: .2, ease: "sine.in" })
  }, { dependencies: [gsapTl, results] })

  return (
    <>
      {isFilmPosters ? (
        <main className="flex-1 relative z-10 flex items-center justify-center mt-6 lg:pt-0 lg:mt-[2%]">
          <button
            ref={leftArrowRef}
            onClick={scrollLeft}
            title="Scroll left"
            aria-label="Scroll left"
          >
            <svg
              className="arrow-gsap hidden lg:inline-block cursor-pointer opacity-0"
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
                  <Poster key={i} result={result} index={i} />
                ) : (
                  <EmptyPoster key={i} result={result} index={i} />
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
              className="arrow-gsap hidden lg:inline-block cursor-pointer opacity-0"
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
