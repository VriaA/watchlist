import { TCast, TCrew } from "../../types/filmTypes"
import imageBaseUrl from "../../utils/imageBaseUrl"
import useScroll from "../../hooks/useScroll"

export default function Cast({credits}: {credits: { cast: TCast[], crew: TCrew[]}}) {
    const { galleryRef, leftArrowRef, rightArrowRef, changeArrowOpacity, scrollLeft, scrollRight } = useScroll()
    const hasCast = credits && credits.cast.length > 0

    function CastWithImage({profile_path, character, name}: TCast): JSX.Element {
        return  (<div className="card card-cast snap-start flex flex-col flex-none gap-1 w-[49%] lg:w-[32%] bg-zinc-900/40 backdrop-blur-md rounded-md pb-2 text-center">
                    <img className="w-full h-48 md:h-72 object-cover object-center rounded-t-md" src={`${imageBaseUrl}${profile_path}`} alt={name + ' image'} loading="lazy" />
                    <p className="font-medium">{name}</p>
                    <p className="font-extralight line-clamp-3">{character}</p>
                </div>)
    }
    
    function CastNoImage({character, name}: TCast): JSX.Element {
        return  (<div className="card card-cast snap-start flex flex-col flex-none gap-1 w-[49%] lg:w-[32%] bg-zinc-900/40 backdrop-blur-md rounded-md pb-2 text-center">
                    <div className="grid place-content-center w-full h-48 md:h-72 rounded-t-md">
                        <span className="material-symbols-outlined text-5xl lg:text-7xl font-thin" aria-hidden={true}>
                            broken_image
                        </span>
                    </div>
                    <p className="font-medium">{name}</p>
                    <p className="font-extralight line-clamp-3">{character}</p>
                </div>)
    }

    function NoCastData(): JSX.Element {
        return ( <p className="card-cast w-full h-full text-lg lg:text-xl font-light text-center">
                    No cast data.
                 </p>)
    }
    
    function CastELements(): JSX.Element[] | JSX.Element {
        if(credits.cast.length > 0 ) {
            return credits.cast.map((cast, i): JSX.Element=> {
                const {profile_path, character, name} = cast
                return profile_path ? <CastWithImage key={i} profile_path={profile_path} character={character} name={name} /> : <CastNoImage key={i} character={character} name={name} />
            })
        } else {
            return <NoCastData />
        }
    }
    
    return (
        <section className="flex items-center lg:h-[90svh] px-[2%] lg:snap-start">
            <h2 className="relative w-[30%] text-3xl md:text-6xl font-robotoCondensed font-normal">
                Cast
                <span className="gallery-title-underline-cast block mt-1 border-b"></span>
            </h2>

            <div className="w-[70%] gallery-cntr hide-film-gallery">

                {hasCast && <div className="arrows-cast flex justify-end items-end gap-3">
                        <button ref={leftArrowRef} onClick={scrollLeft} title="Previous" aria-label="Previous cast">
                            <span className="left-arrow scroll-arrow-small material-symbols-outlined" aria-hidden={true}>
                                keyboard_arrow_left
                            </span> 
                        </button>
                        
                        <button ref={rightArrowRef} onClick={scrollRight} title="Next" aria-label="Next cast">
                            <span className="right-arrow scroll-arrow-small material-symbols-outlined" aria-hidden={true}>
                                keyboard_arrow_right
                            </span> 
                        </button>
                </div>}

                <div className="gallery lg:snap-x lg:snap-mandatory overflow-x-auto" ref={galleryRef} onScroll={changeArrowOpacity}>
                    <div className="cards-cntr flex gap-2 md:gap-5 pl-4 py-2">
                        <CastELements />
                    </div>  
                </div>  
            </div>
        </section>
    )
}