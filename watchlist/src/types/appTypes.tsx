import { Auth, User } from "firebase/auth";

export type TAppContext = {
    isLoggedIn: boolean | null;
    signedInUser: User | null;
    auth: Auth;
    setDialog: React.Dispatch<React.SetStateAction<TDialog>>;
    openDialog: () => void
}

export type TDialog = {
    isOpen: boolean;
    message: null | string;
}