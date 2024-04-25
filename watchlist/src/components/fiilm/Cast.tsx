import { TCast, TCrew } from "../../types/filmTypes"
import imageBaseUrl from "../../utils/imageBaseUrl"

export default function Cast({credits}: {credits: { cast: TCast[], crew: TCrew[]}}) {
    const hasCast = credits.cast.length > 0
    
    function getCastHTML(credits: { cast: TCast[], crew: TCrew[]}) {
        if(credits.cast.length === 0) {
            return <p className="card-cast w-full h-full text-lg lg:text-xl font-light text-center">
                        No cast data.
                    </p>
        }
    
       return credits.cast.map(cast=> {
            const {profile_path, character, name} = cast

            if(!profile_path) {
                return (
                    <div className="card card-cast snap-start flex flex-col flex-none gap-1 w-[49%] lg:w-[32%] bg-zinc-900/40 backdrop-blur-md rounded-md pb-2 text-center">
                        <div className="grid place-content-center w-full h-48 md:h-72 rounded-t-md">
                            <span className="material-symbols-outlined text-5xl lg:text-7xl font-thin">
                                broken_image
                            </span>
                        </div>
                        <p className="font-medium">{name}</p>
                        <p className="font-extralight line-clamp-3">{character}</p>
                    </div>
                )
            }
            return (
                    <div className="card card-cast snap-start flex flex-col flex-none gap-1 w-[49%] lg:w-[32%] bg-zinc-900/40 backdrop-blur-md rounded-md pb-2 text-center">
                        <img className="w-full h-48 md:h-72 object-cover object-center rounded-t-md" src={`${imageBaseUrl}${profile_path}`} alt={name} loading="lazy" />
                        <p className="font-medium">{name}</p>
                        <p className="font-extralight line-clamp-3">{character}</p>
                    </div>
                )
        })
    }
    
    return (
        <section className="flex items-center lg:h-[90svh] px-[2%] lg:snap-start">
            <h2 className="relative w-[30%] text-3xl md:text-6xl font-robotoCondensed font-normal">
                Cast
                <span className="gallery-title-underline-cast block mt-1 border-b"></span>
            </h2>

            <div className="w-[70%] gallery-cntr hide-film-gallery">

                {hasCast && <div className="arrows-cast flex justify-end items-end gap-3">
                            <span id="cast-left-arrow" className="left-arrow scroll-arrow-small material-symbols-outlined" title="Previous">
                                keyboard_arrow_left
                            </span> 
                            <span id="cast-right-arrow" className="right-arrow scroll-arrow-small material-symbols-outlined" title="Next">
                                keyboard_arrow_right
                            </span> 
                </div>}

                <div id="gallery-cast" className="gallery overflow-x-auto">

                    <div className="cards-cntr flex gap-2 md:gap-5 pl-4 py-2">
                        {getCastHTML(credits)}
                    </div>  
                </div>  
            </div>
        </section>
    )
}