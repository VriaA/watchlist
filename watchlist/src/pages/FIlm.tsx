import { CSSProperties, useContext, useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import useFetch from "../hooks/useFetch"
import FilmDetails from "../components/film/FilmDetails"
import Header from "../components/film/Header"
import imageBaseUrl from "../utils/imageBaseUrl"
import filmImage from "../assets/images/film.webp"
import FilmPlaceholder from "../components/film/FilmPlaceholder"
import ErrorMessage from "../components/ErrorMessage"
import { AppContext } from "../contexts/AppContext"
import { TAppContext } from "../types/appTypes"

export default function Film(): JSX.Element {
    const location = useLocation()
    const type: string = location.pathname.trim().split('/')[1]
    const id: string = location.pathname.trim().split('/')[2].split('+')[1]
    const url: string = `https://api.themoviedb.org/3/${type}/${id}?append_to_response=credits%2Cvideos%2Csimilar&language=en-US`
    const { results, error } = useFetch(url)
    const { loading } = useContext(AppContext) as TAppContext
    const [bgImageStyle, setBgImageStyle] = useState<CSSProperties>({})
    const [bgColorBackDrop, setBgColorBackDrop] = useState<string>('')
    const [bgColorFilm, setBgColorFilm] = useState<string>('')

    useEffect(() => {
        if (loading) {
            setBgColorBackDrop('bg-zinc-900')
            setBgColorFilm('bg-zinc-800')
            setBgImageStyle({})
        } else if (!loading && results) {
            const { backdrop_path } = results
            const imageUrl: string = backdrop_path ? imageBaseUrl + backdrop_path : filmImage
            setBgImageStyle({ backgroundImage: `url(${imageUrl})` })
            setBgColorBackDrop(backdrop_path ? 'bg-zinc-900' : 'bg-red-950')
            setBgColorFilm(backdrop_path ? 'bg-zinc-800' : 'bg-red-800')
        }
    }, [loading])

    return (
        <div className={`w-[100svw] h-[100svh] ${bgColorBackDrop} bg-fixed bg-cover bg-filmCntrImgPosition md:bg-filmCntrImgPositionMd bg-blend-overlay text-slate-100 overflow-hidden`}
            style={bgImageStyle}>
            <div className="grid place-content-center w-full h-full backdrop-blur-md">
                <div className={`relative w-[95svw] md:w-[90svw] max-w-7xl h-[95svh] md:h-[90svh] shadow-film ${bgColorFilm} bg-cover rounded-lg font-inter bg-filmBackdropPosition bg-blend-overlay overflow-y-auto lg:snap-mandatory lg:snap-y overflow-x-hidden`}
                    style={bgImageStyle}>
                    <Header />
                    {loading ? <FilmPlaceholder /> :
                        !loading && results ? <FilmDetails film={results} type={type} /> :
                            <ErrorMessage message={error} />}
                </div>
            </div>
        </div>
    )
}