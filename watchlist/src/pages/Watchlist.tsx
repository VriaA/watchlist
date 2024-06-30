import WatchlistFilms from "../components/watchlist/WatchlistFilms"
import { AppContext } from "../contexts/AppContext"
import { TAppContext } from "../types/appTypes"
import { useContext } from "react"

export default function Watchlist(): JSX.Element {
    const { userWatchlist } = useContext(AppContext) as TAppContext

    return (
        <>
            {userWatchlist && <WatchlistFilms />}
        </>
    )
}