import { createContext, useContext, useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import { DocumentData, collection, onSnapshot } from "firebase/firestore"
import { TFilmInWatchlist } from "../types/filmTypes"
import { db } from "../firebase"
import { AppContext } from "./AppContext"
import { TAppContext } from "../types/appTypes"

export type TWatchlistContext = {
    userWatchlist: DocumentData[] | undefined;
    getFilmInWatchlist: (film: TFilmInWatchlist) => DocumentData | undefined
}

export const watchlistContext = createContext<TWatchlistContext | null>(null)

export default function WatchlistContextProvider(): JSX.Element {
    const { setDialog, openDialog, signedInUser } = useContext(AppContext) as TAppContext
    const [userWatchlist, setUserWatchlist] = useState<DocumentData[] | undefined>()

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "watchlist"), (snapshot) => {
            const data = snapshot.docs.map(doc => ({ ...doc.data(), docId: doc.id }));
            setUserWatchlist(() => getUserWatchlist(data))
        },
            () => {
                setDialog((prev) => ({ ...prev, message: "An error occured, please refresh the page." }))
                openDialog()
            })

        return () => unsubscribe()
    }, [])

    function getUserWatchlist(watchlistData: DocumentData[]): DocumentData[] | undefined {
        if (!signedInUser) return
        return watchlistData?.filter(data => data.userId === signedInUser.uid)
    }

    function getFilmInWatchlist(film: TFilmInWatchlist): DocumentData | undefined {
        if (userWatchlist && userWatchlist.length > 0) {
            return userWatchlist.find(filmInWatchlist => filmInWatchlist.filmId === film.filmId)
        }
    }

    return <watchlistContext.Provider value={{ userWatchlist, getFilmInWatchlist }}>
        <Outlet />
    </watchlistContext.Provider>
}