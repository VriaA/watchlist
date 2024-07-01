import { useContext } from "react"
import { Link } from "react-router-dom"
import { AppContext } from "../../contexts/AppContext"
import { TAppContext } from "../../types/appTypes"
import WatchlistUser from "../WatchlistUser"

export default function Header(): JSX.Element {
    const { userWatchlist } = useContext(AppContext) as TAppContext
    return (
        <header className="flex justify-between items-center gap-2 w-full font-robotoCondensed mt-4 mb-[3svh] lg:mb-[4svh]">
            <nav className="flex flex-col gap-4">
                <h1 className="text-2xl md:text-3xl uppercase font-inter font-medium">My watchlist</h1>

                <ul className={`${!userWatchlist ? 'hidden' : ''} flex gap-2 text-sm md:text-base flex-wrap`}>
                    <li><Link to="." className="watchlist-filter peer-checked/all:bg-zinc-100 peer-checked/all:text-zinc-900">All</Link></li>
                    <li><Link to="?filter=watched" className="watchlist-filter peer-checked/watched:bg-zinc-100 peer-checked/watched:text-zinc-900">Watched</Link></li>
                    <li><Link to="?filter=notwatched" className="watchlist-filter peer-checked/not-watched:bg-zinc-100 peer-checked/not-watched:text-zinc-900">Not watched</Link></li>
                </ul>
            </nav>

            <nav>
                <ul className="flex items-center gap-4 md:gap-6">
                    <li><Link to="/" className="nav-link static">Find your film</Link></li>
                    <li><WatchlistUser /></li>
                </ul>
            </nav>
        </header>
    )
}