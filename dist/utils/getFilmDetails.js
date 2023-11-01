import { options } from "./getSearchResults.js";
 
//FETCHES DATA ABOUT THE FILM SELECTED WHEN THE POSTER IS CLICKED USING THE ID OF THE FILM
export default async function getFilmDetails(filmType, filmId) {
    const response = await fetch(`https://api.themoviedb.org/3/${filmType}/${filmId}?append_to_response=credits%2Cvideos%2Csimilar&language=en-US`, options)
    const data = await response.json()
    return data
}