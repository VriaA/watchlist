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
                <h1 className="text-2xl md:text-3xl uppercase font-inter font-medium">
                    My watchlist
                </h1>

                <ul className={`${!userWatchlist ? "hidden" : ""} flex gap-2 text-sm md:text-base flex-wrap`}>
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

            <nav>
                <ul className="flex items-center gap-4 md:gap-6">
                    <li>
                        <Link to="/" className="nav-link static">
                            Find your film
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
