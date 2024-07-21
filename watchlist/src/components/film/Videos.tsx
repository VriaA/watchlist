import { TVideo } from "../../types/filmTypes";
import useScroll from "../../hooks/useScroll";

export default function Videos({ videos }: { videos: { results: TVideo[] } }) {
  const {
    galleryRef,
    leftArrowRef,
    rightArrowRef,
    changeArrowOpacity,
    scrollLeft,
    scrollRight,
  } = useScroll();
  const hasVideos = videos.results.length > 0;

  return (
    <section className="flex items-center lg:h-[90svh] px-[2%] lg:snap-start">
      <h2 className="relative w-[30%] text-3xl md:text-6xl font-robotoCondensed font-normal">
        Videos
        <span className="gallery-title-underline-videos block mt-1 border-b w-0"></span>
      </h2>

      <div className="w-[70%]">
        {hasVideos && (
          <div className="arrows-videos flex justify-end items-center gap-3 opacity-0">
            <button
              ref={leftArrowRef}
              onClick={scrollLeft}
              title="Scroll videos left"
              aria-label="Scroll videos left"
            >
              <svg
                className="hidden lg:inline-block cursor-pointer"
                aria-hidden={true}
                xmlns="http://www.w3.org/2000/svg"
                height="36px"
                viewBox="0 -960 960 960"
                width="36px"
                fill="#f8fafc"
              >
                <path d="M560.67-240 320-480.67l240.67-240.66L608-674 414.67-480.67 608-287.33 560.67-240Z" />
              </svg>
            </button>

            <button
              ref={rightArrowRef}
              onClick={scrollRight}
              title="Scroll videos right"
              aria-label="Scroll vidoes right"
            >
              <svg
                className="hidden lg:inline-block cursor-pointer"
                aria-hidden={true}
                xmlns="http://www.w3.org/2000/svg"
                height="36px"
                viewBox="0 -960 960 960"
                width="36px"
                fill="#f8fafc"
              >
                <path d="M521.33-480.67 328-674l47.33-47.33L616-480.67 375.33-240 328-287.33l193.33-193.34Z" />
              </svg>
            </button>
          </div>
        )}

        <div
          className="gallery overflow-x-auto pl-2 md:px-4 lg:snap-x lg:snap-mandatory"
          ref={galleryRef}
          onScroll={changeArrowOpacity}
        >
          <div className="cards-cntr flex gap-2 md:gap-3 py-2" data-gallery="videos">
            {videos.results.length > 0 ? (
              videos.results.map((video, i) => {
                const { id, key } = video;
                return (
                  <div key={key} className="card snap-start flex-none w-[100%] lg:w-[50%] h-80 rounded-md">
                    <iframe
                      className={`card-videos w-full h-full rounded-md ${i <= 3 ? 'translate-y-14 opacity-0' : ''}`}
                      src={`https://www.youtube.com/embed/${key}?si=${id}`}
                      title="YouTube video player"
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  </div>
                );
              })
            ) : (
              <p className="card-videos w-full h-full text-lg lg:text-xl font-light text-center translate-y-14 opacity-0">
                No videos.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
