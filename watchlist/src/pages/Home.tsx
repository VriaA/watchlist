import { Link, useNavigate } from "react-router-dom";
import useSearch from "../hooks/useSearch";
import WatchlistUser from "../components/WatchlistUser";

export default function Home(): JSX.Element {
  const navigate = useNavigate();
  const {
    searchTitle,
    updateSearchTitleOnChange,
    isTitleMessageVisible,
    handleSearchFormSubmit,
  } = useSearch();

  return (
    <div className="w-[100svw] h-[100svh] page-wrapper bg-homeImg bg-wrapperImgPosition md:bg-wrapperImgPositionMd">
      <div className=" w-[100svw] h-[100svh] grid place-content-center">
        <div className="content-cntr overflow-y-auto lg:overflow-hidden">
          <div className="flex-1 flex flex-col justify-center items-center">
            <div className="absolute top-8 right-8 flex items-center gap-4 md:gap-6">
              <Link className="nav-link leading-none" to="watchlist">
                My watchlist
              </Link>
              <WatchlistUser />
            </div>

            <Link
              to="/"
              className="font-medium text-4xl px-2 text-center md:text-7xl uppercase mb-3 md:mb-9"
            >
              <h1>Find your film</h1>
            </Link>

            <main className="relative flex justify-center w-full">
              <form
                className="relative flex justify-end w-[68%] lg:w-[35%] h-10 bg-zinc-900/40 rounded-full overflow-hidden border border-stone-900/30"
                onSubmit={(e) => handleSearchFormSubmit(e, navigate)}
              >
                <svg
                  className="self-center absolute inset-0 my-auto w-6 md:w-[30px] left-2 z-50"
                  xmlns="http://www.w3.org/2000/svg"
                  height="30px"
                  viewBox="0 -960 960 960"
                  width="30px"
                  fill="#f8fafc"
                >
                  <path d="M781.69-136.92 530.46-388.16q-30 24.77-69 38.77-39 14-80.69 14-102.55 0-173.58-71.01-71.03-71.01-71.03-173.54 0-102.52 71.01-173.6 71.01-71.07 173.54-71.07 102.52 0 173.6 71.03 71.07 71.03 71.07 173.58 0 42.85-14.38 81.85-14.39 39-38.39 67.84l251.23 251.23-42.15 42.16ZM380.77-395.38q77.31 0 130.96-53.66 53.66-53.65 53.66-130.96t-53.66-130.96q-53.65-53.66-130.96-53.66t-130.96 53.66Q196.15-657.31 196.15-580t53.66 130.96q53.65 53.66 130.96 53.66Z" />
                </svg>

                <input
                  className="w-full h-full px-10 text-[10px] min-[375px]:text-sm md:text-base bg-transparent outline-none text-center border-none"
                  type="text"
                  aria-label="Search Bar"
                  name="Movie Title"
                  placeholder="Movie or TV show title"
                  autoComplete="off"
                  onChange={updateSearchTitleOnChange}
                  value={searchTitle}
                />
              </form>
              <span
                className={`${isTitleMessageVisible ? "opacity-1" : "opacity-0"} absolute -bottom-8 md:bottom-[-36px] mt-2 px-2 md:px-4 py-1 text-[8px] min-[375px]:text-xs md:text-sm bg-zinc-900 font-normal leading-wide text-slate-50 rounded-full transition-opacity`}
              >
                Please enter a title to search.
              </span>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
