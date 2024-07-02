import React, { useEffect, useState } from "react"
import { DocumentData, collection, onSnapshot, query, where } from "firebase/firestore"
import { TFilmInWatchlist } from "../types/filmTypes"
import { db } from "../firebase"
import { User } from "firebase/auth"
import { TDialog } from "../types/appTypes"
import { useLocation, useSearchParams } from "react-router-dom"

export type TUseWatchlist = {
    userWatchlist: DocumentData[] | undefined;
    getFilmInWatchlist: (film: TFilmInWatchlist) => DocumentData | undefined;
    setUserWatchlist: React.Dispatch<React.SetStateAction<DocumentData[] | undefined>>
}

export type TUseWatchlistParams = {
    setDialog: React.Dispatch<React.SetStateAction<TDialog>>;
    openDialog: () => void;
    signedInUser: User | null;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export default function useWatchlist({ setDialog, openDialog, signedInUser, setLoading }: TUseWatchlistParams): TUseWatchlist {
    const [userWatchlist, setUserWatchlist] = useState<DocumentData[] | undefined>()
    const location = useLocation()
    const [searchParams] = useSearchParams()

    useEffect(() => {
        if (!signedInUser) return
        const watchlistFilter = searchParams.get('filter')
        const q = query(collection(db, "watchlist"), where('userId', '==', signedInUser.uid))
        setLoading(() => true)
        const unsubscribe = onSnapshot(q,
            (snapshot) => {
                try {
                    const watchlist: DocumentData[] = snapshot.docs.map(doc => ({ ...doc.data(), docId: doc.id }));
                    watchlist?.filter((film) => {
                        if (watchlistFilter === 'watched') {
                            return film.iswatched
                        } else if (watchlistFilter === 'notwatched') {
                            return !film.iswatched
                        } else {
                            return film
                        }
                    })
                    setUserWatchlist(() => watchlist)
                } catch {
                    setDialog((prev) => ({ ...prev, message: "An error occured, please refresh the page." }))
                    openDialog()
                } finally {
                    setLoading(() => false)
                }
            })

        return () => {
            unsubscribe()
        }
    }, [signedInUser, location.search])

    function getFilmInWatchlist(film: TFilmInWatchlist): DocumentData | undefined {
        if (userWatchlist && userWatchlist.length > 0) {
            return userWatchlist.find(filmInWatchlist => filmInWatchlist.filmId === film.filmId)
        }
    }

    return { userWatchlist, getFilmInWatchlist, setUserWatchlist }
}