import Loader from "../components/loader/loader"
import WatchlistFilms from "../components/watchlist/WatchlistFilms"
import { AppContext } from "../contexts/AppContext"
import { TAppContext } from "../types/appTypes"
import { useContext } from "react"

export default function Watchlist(): JSX.Element {
    const { userWatchlist, loading } = useContext(AppContext) as TAppContext

    return (
        <>
            {loading && <Loader style="absolute left-0 top-0 flex-1 z-[9999]" />}
            {userWatchlist && <WatchlistFilms />}
        </>
    )
}