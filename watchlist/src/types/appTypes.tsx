import { Auth, User } from "firebase/auth";
import React from "react";
import { DocumentData } from "firebase/firestore";
import { TFilmInWatchlist } from "./filmTypes";

export type TAppContext = {
    isLoggedIn: boolean | null;
    signedInUser: User | null;
    auth: Auth;
    setDialog: React.Dispatch<React.SetStateAction<TDialog>>;
    openDialog: () => void;
    userWatchlist: DocumentData[] | undefined;
    getFilmInWatchlist: (film: TFilmInWatchlist) => DocumentData | undefined;
    setUserWatchlist: React.Dispatch<React.SetStateAction<DocumentData[] | undefined>>
}

export type TDialog = {
    isOpen: boolean;
    message: null | string;
}

export type TChildren = {
    children: React.ReactNode
}