import { ReactNode } from 'react'

export type TResultContextProvider = {
    children: ReactNode;
}

export type TResult = {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    media_type: string;
    type: string;
    original_language: string;
    original_title: string;
    name: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
} 

export type TData = {
    page: number;
    results: TResult[];
    total_pages: number;
    total_results: number;
}

export type TResults = TResult[]

export type TPosterProps = {
    result: TResult
}