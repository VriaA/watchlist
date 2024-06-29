import React, { useEffect, useState } from "react"
import { DocumentData, collection, onSnapshot } from "firebase/firestore"
import { TFilmInWatchlist } from "../types/filmTypes"
import { db } from "../firebase"
import { User } from "firebase/auth"
import { TDialog } from "../types/appTypes"

export type TUseWatchlist = {
    userWatchlist: DocumentData[] | undefined;
    getFilmInWatchlist: (film: TFilmInWatchlist) => DocumentData | undefined;
    setUserWatchlist: React.Dispatch<React.SetStateAction<DocumentData[] | undefined>>
}

export type TUseWatchlistParams = {
    setDialog: React.Dispatch<React.SetStateAction<TDialog>>;
    openDialog: () => void;
    signedInUser: User | null;
}

export default function useWatchlist({ setDialog, openDialog, signedInUser }: TUseWatchlistParams): TUseWatchlist {
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
    }, [signedInUser])

    function getUserWatchlist(watchlistData: DocumentData[]): DocumentData[] | undefined {
        if (!signedInUser) return
        return watchlistData?.filter(data => data.userId === signedInUser.uid)
    }

    function getFilmInWatchlist(film: TFilmInWatchlist): DocumentData | undefined {
        if (userWatchlist && userWatchlist.length > 0) {
            return userWatchlist.find(filmInWatchlist => filmInWatchlist.filmId === film.filmId)
        }
    }

    return { userWatchlist, getFilmInWatchlist, setUserWatchlist }
}