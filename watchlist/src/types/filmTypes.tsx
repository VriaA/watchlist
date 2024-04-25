import { iso639_1LanguageCodes } from "../data/iso639LanguageCodes";

export type TMovie = {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: boolean;
    budget: number;
    homepage: string;
    credits:{ cast: TCast[], crew: TCrew[]};
    genres: {id: number; name: string;}[];
    id: number;
    imdb_id: string;
    origin_country: string[];
    original_language:  keyof typeof iso639_1LanguageCodes;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: {id: number; logo_path: string | null; name: string; origin_country: string}[];
    production_countries: {iso_3166_1: string; name: string;}[];
    release_date: string;
    revenue: number;
    runtime: number;
    similar: TSimilarObj;
    spoken_languages: {english_name: string, iso_639_1: string, name: string}[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    videos: {results: TVideo[]};
    vote_average: number;
    vote_count: number;
}

export type TSeries = {
    adult: boolean;
    id: number;
    genres: {id: number; name: string;}[];
    backdrop_path: string;
    episode_run_time: [number];
    release_date: string; 
    first_air_date: string; 
    last_air_date: string;
    last_episode_to_air: TEpisodeToAir;
    next_episode_to_air: TEpisodeToAir | null;
    networks: TNetwork[];
    homepage: string;
    in_production: boolean;
    title: string; 
    original_title: string; 
    name: string; 
    original_name: string; 
    overview: string; 
    popularity: number;
    origin_country: string[];
    original_language:  keyof typeof iso639_1LanguageCodes; 
    languages: string[];
    number_of_episodes: number;
    number_of_seasons: number; 
    poster_path: string;
    production_companies: {id: number; logo_path: string | null; name: string; origin_country: string}[];
    production_countries: {iso_3166_1: string; name: string;}[];
    created_by: TCreatedBy[];
    credits:{ cast: TCast[], crew: TCrew[]}; 
    videos: {results: TVideo[]};
    seasons: TSeason[];
    similar: TSimilarObj;
    spoken_languages: {english_name: string, iso_639_1: string, name: string}[];
    status: string;
    tagline: string;
    type: string;
    vote_average: number;
    vote_count: number;
}

export type TCast = {
    adult?: boolean;
    character: string;
    credit_id?: string;
    gender?: number;
    id?: number;
    known_for_department?: string;
    name: string;
    order?: number;
    original_name?: string;
    popularity?: number;
    profile_path?: string;
}

export type TCrew = {
    adult: boolean;
    credit_id: string;
    department: string;
    gender: number;
    id: number;
    job: string;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string | null;
}

export type TVideo = {
    id: string;
    iso_639_1: string;
    iso_3166_1: string;
    key: string;
    name: string;
    official: boolean;
    published_at: string;
    site: string;
    size: number;
    type: string;
}

export type TSimilar = {
    id: number;
    name: string;
    original_name: string  
    title: string;
    original_title: string    
    adult: boolean
    backdrop_path: string | null
    first_air_date: string
    genre_ids: number[]
    origin_country: string[]
    original_language: string
    overview: string
    popularity: number
    poster_path: string
    vote_average: number
    vote_count: number
}

export type TSimilarObj = { 
    page: number; 
    results: TSimilar[];
    total_pages: number;
    total_results: number; 
}

type TSeason = {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
    vote_average: number
}

type TCreatedBy = {
    credit_id: string;
    gender: number;
    id: number;
    name: string;
    original_name: string;
    profile_path: string;
}

type TNetwork = {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
}

type TEpisodeToAir = {
    air_date: string;
    episode_number: number;
    episode_type: string;
    id: number;
    name: string;
    overview: string;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: string;
    vote_average: number;
    vote_count: number;
}