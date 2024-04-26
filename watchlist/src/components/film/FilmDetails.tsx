import Hero from "./Hero"
import Cast from "./Cast"
import Videos from "./Videos"
import Similar from "./SImilar"
import { TMovie, TSeries } from "../../types/filmTypes"

type filmDetailsProp = {
    film: TMovie | TSeries;
    type: string;
}

export default function FilmDetails({film, type}: filmDetailsProp) {

    return (
            <main className="h-full">
                <Hero type={type} film={film} />
                <div className="flex flex-col justify-center py-16 lg:py-0 gap-16 lg:gap-0 min-h-full bg-zinc-900/40 backdrop-blur-md rounded-md">
                    <Cast credits={film.credits} />
                    <Videos videos={film.videos}/>
                    <Similar similar={film.similar} type={type} />
                </div>
            </main>
    )
}