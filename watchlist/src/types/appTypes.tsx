import { ReactNode } from 'react'

export type TAppContext = {
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export type TChildren = {
    children: ReactNode;
}