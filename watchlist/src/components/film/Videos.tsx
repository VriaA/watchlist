import { TVideo } from "../../types/filmTypes"
import useScroll from "../../hooks/useScroll"

export default function Videos({videos}: {videos: {results: TVideo[]}}) {
    const {galleryRef, leftArrowRef, rightArrowRef, changeArrowOpacity, scrollLeft, scrollRight} = useScroll()
    const hasVideos = videos.results.length > 0

    return (
        <section className="flex items-center lg:h-[90svh] px-[2%] lg:snap-start">
            <h2 className="relative w-[30%] text-3xl md:text-6xl font-robotoCondensed font-normal">
                Videos
                <span className="gallery-title-underline-videos block mt-1 border-b"></span>    
            </h2>

            <div className="w-[70%] gallery-cntr hide-film-gallery">
                {hasVideos &&
                    <div className="arrows-videos flex justify-end items-end gap-3 pl-4">
                        <button ref={leftArrowRef} onClick={scrollLeft} title="Previous">
                            <span className="scroll-arrow-small material-symbols-outlined">
                                keyboard_arrow_left
                            </span>
                        </button>
                        <button ref={rightArrowRef} onClick={scrollRight} title="Next">
                            <span className="scroll-arrow-small material-symbols-outlined">
                                keyboard_arrow_right
                            </span>
                        </button>
                    </div>
                }

                <div className="gallery overflow-x-auto pl-2 md:px-4 lg:snap-x lg:snap-mandatory" ref={galleryRef} onScroll={changeArrowOpacity}>
                    <div className="cards-cntr flex gap-2 md:gap-3 py-2">
                        {videos.results.length > 0 ?
                            videos.results.map(video=> {
                                const {id, key} = video
                                return (<iframe key={key} className="card card-videos snap-start flex-none w-[100%] lg:w-[50%] h-80 rounded-md"
                                            src={`https://www.youtube.com/embed/${key}?si=${id}`} title="YouTube video player" loading="lazy"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>)
                                })
                        :<p className="card-videos w-full h-full text-lg lg:text-xl font-light text-center">No videos.</p>
                        }
                    </div>
                </div>
            </div>    
        </section>
    )
}