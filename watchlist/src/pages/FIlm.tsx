import { useLocation } from "react-router-dom"
import  { useEffect } from "react"
import imageBaseUrl from "../utils/imageBaseUrl"
import useFetch from "../hooks/useFetch"
import Hero from "../components/fiilm/Hero"
import Cast from "../components/fiilm/Cast"
import Videos from "../components/fiilm/Videos"
import Similar from "../components/fiilm/SImilar"
import FilmImage from "../assets/images/film.webp"

export default function Film(): JSX.Element {
    const location = useLocation()
    const type: string = location.pathname.trim().split('/')[1]
    const id: string = location.pathname.trim().split('/')[2].split('+')[1]
    const url: string = `https://api.themoviedb.org/3/${type}/${id}?append_to_response=credits%2Cvideos%2Csimilar&language=en-US`
    const { results, error, loading } = useFetch(url)

    return (
        <>
            {
                loading ? <h1>loading...</h1> :
                results ? <>
                            <Hero type={type} film={results} />
                            <Cast credits={results.credits} />
                            <Videos videos={results.videos}/>
                            <Similar similar={results.similar} />
                          </>
                 :
                <h1>{error}</h1>
            }
        </>
    )
}