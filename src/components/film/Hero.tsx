import { KeyboardEvent, MouseEvent, useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import { TAppContext } from "../../types/appTypes";
import { iso639_1LanguageCodes } from "../../data/iso639LanguageCodes";
import { TFilmInWatchlist, TMovie, TSeries } from "../../types/filmTypes";
import { db } from "../../firebase";
import {
  DocumentData,
  addDoc,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import imageBaseUrl from "../../utils/imageBaseUrl";
import { useNavigate } from "react-router-dom";
import UnknownValuePlaceHolder from "../UnknownValuePlaceHolder";
import getRunTime from "../../utils/getRuntime";
import FilmType from "../FilmType";
import { useGSAP } from "@gsap/react";
import { gsap, Power0 } from "gsap";

export default function Hero({
  film,
  type,
}: {
  film: TMovie | TSeries;
  type: string;
}) {
  const navigate = useNavigate();
  const {
    signedInUser,
    setDialog,
    openDialog,
    userWatchlist,
    getFilmInWatchlist,
    loading,
    setLoading,
    canAnimate
  } = useContext(AppContext) as TAppContext;
  const {
    title,
    original_title,
    genres,
    runtime,
    release_date,
    overview,
    original_language,
    id,
    poster_path,
  } = film as TMovie;
  const {
    name,
    original_name,
    first_air_date,
    number_of_seasons,
    episode_run_time,
  } = film as TSeries;
  const language = getLanguage(original_language);

  const isTv: boolean = type === "tv";
  const hasGenre: boolean = genres && genres.length > 0;
  const hasEpisodeRunTime: boolean =
    episode_run_time && episode_run_time.length > 0;
  const episodeRunTime: number | null = hasEpisodeRunTime
    ? episode_run_time[0]
    : null;
  const runTime = getRunTime(runtime || episodeRunTime);
  const filmName: string = title || original_title || name || original_name;
  const year = getYear(release_date || first_air_date);

  function getGenres(
    genres: { id: number; name: string }[],
    hasGenre: boolean,
  ): string | JSX.Element {
    return hasGenre
      ? genres.map((genre) => `${genre.name}`).join(" | ")
      : UnknownValuePlaceHolder();
  }

  function getYear(date: string): string | JSX.Element {
    return date ? date.split("-")[0] : UnknownValuePlaceHolder();
  }

  function getLanguage(
    code: keyof typeof iso639_1LanguageCodes,
  ): string | JSX.Element {
    if (iso639_1LanguageCodes[code]) {
      return iso639_1LanguageCodes[code];
    }
    return UnknownValuePlaceHolder();
  }

  function toggleLineClamp(
    e: KeyboardEvent | MouseEvent,
    length: number,
  ): void {
    const isEnterKeyPress =
      e.type === "keydown" && (e as KeyboardEvent).key === "Enter";
    const isClick = e.type === "click";
    const clampabble = e.target as HTMLParagraphElement;

    if (isClick || isEnterKeyPress) {
      clampabble.classList.toggle(`line-clamp-${length}`);
      clampabble.classList.toggle("overflow-y-auto");
      clampabble.scrollTo(0, 0);
    }
  }

  const newWatchlistFilm: TFilmInWatchlist = {
    poster: imageBaseUrl + poster_path,
    name: filmName,
    year: typeof year === "string" ? year : null,
    runtime: typeof runTime === "number" ? runTime : null,
    iswatched: false,
    filmId: id,
    filmType: type,
    userId: signedInUser?.uid as string,
    timestamp: serverTimestamp(),
  };

  const isFilmInWatchlist = getFilmInWatchlist(newWatchlistFilm);

  function handleWatchlistBtnClick(): void {
    setLoading(() => true);
    if (signedInUser) {
      if (!userWatchlist || !isFilmInWatchlist) {
        addToWatchlist();
      } else {
        removeFromWatchlist();
      }
    } else {
      setLoading(() => false);
      navigate("../sign-in");
    }
  }

  function addToWatchlist(): void {
    try {
      addDoc(collection(db, "watchlist"), newWatchlistFilm);
    } catch (error: any) {
      setDialog((prev) => ({ ...prev, message: error.message }));
      openDialog();
    } finally {
      setLoading(() => false);
    }
  }

  function removeFromWatchlist(): void {
    try {
      const docId = (getFilmInWatchlist(newWatchlistFilm) as DocumentData)
        .docId;
      deleteDoc(doc(db, "watchlist", docId));
    } catch (error: any) {
      setDialog((prev) => ({ ...prev, message: error.message }));
      openDialog();
    } finally {
      setLoading(() => false);
    }
  }

  useGSAP(() => {
    if (!canAnimate || loading) return
    const tl = gsap.timeline()
    tl.fromTo('.text-to-reveal', { clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' }, { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', duration: 1, ease: Power0.easeIn })
    tl.from('#film-cta-btn-cntr', { opacity: 0, ease: "sine.in", duration: .8 }, "<")
    tl.fromTo('#scroll-indicator-thumb', { opacity: 0 }, { opacity: 1, ease: "sine.in" })
    tl.to('#scroll-indicator-thumb', { repeat: -1, yoyo: true, y: 32, opacity: 1, duration: 1.5, ease: "sine.in" })
  }, [canAnimate])

  return (
    <div className="min-h-[100%] flex flex-col gap-12 md:gap-0 justify-end md:flex-row md:justify-between md:items-center mt-5 p-[4%] pb-[10%] md:p-[2%]  font-inter font-normal md:font-light md:tracking-wide">
      <section className="text-to-reveal flex flex-col gap-2 md:gap-4 md:w-[50%]">
        <h1
          tabIndex={0}
          className="max-h-[300px] pb-1 text-4xl md:text-5xl lg:text-7xl line-clamp-4 font-robotoCondensed font-medium capitalize cursor-pointer"
          onClick={(e) => toggleLineClamp(e, 4)}
          onKeyDown={(e) => toggleLineClamp(e, 4)}
        >
          {filmName}
        </h1>

        <div className="flex flex-wrap gap-3 items-center text-sm md:text-base">
          <p>{getGenres(genres, hasGenre)}</p>
          <span className="text-[8px] md:text-[5px]">&#9679;</span>
          <p className="flex gap-1">{runTime} mins</p>
          <span className="text-[8px] md:text-[5px]">&#9679;</span>
          <p>{year}</p>
        </div>

        <p
          tabIndex={0}
          className="md:text-lg max-h-[150px] md:max-h-[170px] line-clamp-3 cursor-pointer"
          onClick={(e) => toggleLineClamp(e, 3)}
          onKeyDown={(e) => toggleLineClamp(e, 3)}
        >
          {overview}
        </p>

        <div className="flex flex-wrap gap-3 items-center text-sm md:text-base">
          <p className="flex items-center h-fit">Language: {language}</p>

          <span className="text-[8px] md:text-[5px]">&#9679;</span>

          <p>{FilmType(type)}</p>

          {isTv && (
            <>
              <p className="text-[8px] md:text-[5px]">&#9679;</p>
              <p className="flex items-center h-fit">
                {number_of_seasons} season{number_of_seasons > 1 ? "s" : ""}
              </p>
            </>
          )}
        </div>
      </section>

      <section className="md:w-[45%]">
        <div id="film-cta-btn-cntr" className="relative z-[5] flex justify-end md:justify-center items-center gap-2 md:gap-4">
          <button
            className="group flex justify-center items-center px-5 py-4 md:p-5 bg-red-900/90 hover:bg-zinc-950/90 shadow-addButton hover:shadow-addButtonHover rounded-full cursor-pointer transition-transform active:translate-y-1 active:shadow-xl active:shadow-red-900/90"
            onClick={handleWatchlistBtnClick}
          >
            {loading ? (
              <svg className="w-8 md:w-[60px] stroke-zinc-900 group-hover:stroke-red-900/90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" style={{ shapeRendering: "auto", display: "block", background: "transparent", }} xmlnsXlink="http://www.w3.org/1999/xlink">
                <g><circle strokeDasharray="164.93361431346415 56.97787143782138" r="35" strokeWidth="10" fill="none" cy="50" cx="50">
                  <animateTransform keyTimes="0;1" values="0 50 50;360 50 50" dur="1s" repeatCount="indefinite" type="rotate" attributeName="transform"></animateTransform>
                </circle>
                  <g></g>
                </g>
              </svg>
            ) : isFilmInWatchlist ? (
              <svg className="w-9 md:w-[60px] fill-zinc-900 group-hover:fill-red-900/90" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"> <path d="M109.26-309.81v-88.52h321.41v88.52H109.26Zm0-178.22v-88.14h482.3v88.14h-482.3Zm0-177.84v-88.15h482.3v88.15h-482.3Zm550.38 494.03L506.56-324.91l61.74-62.41 91.34 90 180-179.81 62.97 62.88-242.97 242.41Z" />
              </svg>
            ) : (
              <svg className="w-9 md:w-[60px] fill-zinc-900 group-hover:fill-red-900/90" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                <path d="M109.26-309.14v-88.53h322.16v88.53H109.26Zm0-178.22v-88.15h481.48v88.15H109.26Zm0-177.84v-88.15h481.48v88.15H109.26Zm541.18 515.19v-159.13h-159.7v-88.53h159.7v-159.69h88.52v159.69h159.13v88.53H738.96v159.13h-88.52Z" />
              </svg>
            )}
          </button>

          <h3 className="md:text-lg">
            {isFilmInWatchlist ? "Remove from watchlist" : "Add to watchlist"}
          </h3>
        </div>

        <div className="absolute left-6 bottom-2 md:left-auto md:right-2 flex gap-2">
          <div className="grid grid-cols-1 grid-rows-1">
            <span className="col-start-1 col-end-2 row-start-1 row-end-1 justify-self-center z-10 block w-[2px] h-14 bg-zinc-900 opacity-60"></span>
            <span id="scroll-indicator-thumb" className="col-start-1 col-end-2 row-start-1 row-end-1 justify-self-center z-20 block w-[3px] h-6 bg-red-800 rounded-sm"></span>
          </div>
          <p className="self-end w-6 md:w-14 leading-none font-robotoCondensed font-normal md:font-light text-sm md:tracking-wide">
            Scroll down
          </p>
        </div>
      </section>
    </div>
  );
}
