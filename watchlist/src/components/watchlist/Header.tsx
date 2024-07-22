import { useContext } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { AppContext } from "../../contexts/AppContext";
import { TAppContext } from "../../types/appTypes";
import WatchlistUser from "../WatchlistUser";

export default function Header(): JSX.Element {
    const { userWatchlist } = useContext(AppContext) as TAppContext;
    const [searchParams] = useSearchParams();
    const filter = searchParams.get("filter");

    return (
        <header className="flex justify-between items-center gap-2 w-full font-robotoCondensed mt-4 mb-[3svh] lg:mb-[4svh]">
            <nav className="flex flex-col gap-4">
                <h1 className="heading-gsap opacity-0 scale-0 text-2xl md:text-3xl uppercase font-inter font-medium">
                    My watchlist
                </h1>

                <ul className={`${!userWatchlist ? "hidden" : ""} nav-gsap opacity-0 flex gap-2 text-sm md:text-base flex-wrap`}>
                    <li>
                        <Link
                            to="."
                            className={`watchlist-filter ${!filter ? "bg-zinc-100 text-zinc-900 hover:bg-zinc-200" : ""}`}>
                            All
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="?filter=watched"
                            className={`watchlist-filter ${filter === "watched" ? "bg-zinc-100 text-zinc-900 hover:bg-zinc-200" : ""}`}
                        >
                            Watched
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="?filter=notwatched"
                            className={`watchlist-filter ${filter === "notwatched" ? "bg-zinc-100 text-zinc-900 hover:bg-zinc-200" : ""}`}
                        >
                            Not watched
                        </Link>
                    </li>
                </ul>
            </nav>

            <nav className="nav-gsap opacity-0">
                <ul className="flex items-center gap-4 md:gap-6">
                    <li>
                        <Link to="/" className="transition-transform hover:-translate-y-[2px] active:translate-y-[2px]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24">
                                <g fill="none" stroke="#f1f5f9" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4">
                                    <path d="M5 12H3l9-9l9 9h-2M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7" />
                                    <path d="M9 21v-6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6" />
                                </g>
                            </svg>
                        </Link>
                    </li>
                    <li>
                        <WatchlistUser />
                    </li>
                </ul>
            </nav>
        </header>
    );
}
