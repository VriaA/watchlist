import { useContext } from "react"
import { AppContext } from "../../contexts/AppContext"
import { TAppContext } from "../../types/appTypes"
import EmptyWatchlistMessage from "./EmptyWatchlistMessage"
import SavedFilm from "./SavedFilm"

export default function WatchlistFilms(): JSX.Element {
    const { userWatchlist } = useContext(AppContext) as TAppContext

    return (
        <main className="films grid gap-3 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
            {userWatchlist && userWatchlist.length > 0 ?
                userWatchlist.map(film => <SavedFilm key={film.filmId} film={film} />)
                :
                <EmptyWatchlistMessage />}
        </main>
    )
}