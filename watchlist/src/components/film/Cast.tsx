import { TCast, TCrew } from "../../types/filmTypes";
import imageBaseUrl from "../../utils/imageBaseUrl";
import useScroll from "../../hooks/useScroll";

export default function Cast({
    credits,
}: {
    credits: { cast: TCast[]; crew: TCrew[] };
}) {
    const {
        galleryRef,
        leftArrowRef,
        rightArrowRef,
        changeArrowOpacity,
        scrollLeft,
        scrollRight,
    } = useScroll();
    const hasCast = credits && credits.cast.length > 0;

    function CastWithImage({
        profile_path,
        character,
        name,
        index
    }: {
        profile_path: string;
        character: string;
        name: string;
        index: number
    }): JSX.Element {
        return (
            <div className='card snap-start flex flex-col flex-none w-[49%] lg:w-[32%]'>
                <div className={`card-cast gap-1 bg-zinc-900/40 backdrop-blur-md rounded-md pb-2 text-center ${index <= 3 ? 'translate-y-14 opacity-0' : ''}`}>
                    <img
                        className="w-full h-48 md:h-72 object-cover object-center rounded-t-md"
                        src={`${imageBaseUrl}${profile_path}`}
                        alt={name + " image"}
                        loading="lazy"
                    />
                    <p className="font-medium">{name}</p>
                    <p className="font-extralight line-clamp-3">{character}</p>
                </div>
            </div>
        );
    }

    function CastNoImage({ character, name, index }: { character: string; name: string; index: number }): JSX.Element {
        return (
            <div className='card snap-start flex-none w-[49%] lg:w-[32%] rounded-md'>
                <div className={`card-cast w-full flex flex-col items-center flex-none gap-1 pb-2 bg-zinc-900/40 backdrop-blur-md rounded-md ${index <= 3 ? 'translate-y-14 opacity-0' : ''}`}>
                    <div className="grid place-content-center w-full h-48 md:h-72 rounded-t-md">
                        <svg
                            className="w-12 h-12 lg:w-[72px] lg:h-[72px]"
                            aria-hidden={true}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 -960 960 960"
                            fill="#ffffff "
                        >
                            <path d="M224.62-160q-27.62 0-46.12-18.5Q160-197 160-224.62v-510.76q0-27.62 18.5-46.12Q197-800 224.62-800h510.76q27.62 0 46.12 18.5Q800-763 800-735.38v510.76q0 27.62-18.5 46.12Q763-160 735.38-160H224.62ZM240-428.54l160-160 160 160 160-160 40 40v-186.84q0-10.77-6.92-17.7-6.93-6.92-17.7-6.92H224.62q-10.77 0-17.7 6.92-6.92 6.93-6.92 17.7v266.84l40 40ZM224.62-200h510.76q10.77 0 17.7-6.92 6.92-6.93 6.92-17.7v-267.07l-40-40-160 160-160-160-160 160-40-40v187.07q0 10.77 6.92 17.7 6.93 6.92 17.7 6.92ZM200-200v-291.69 40V-760v560Z" />
                        </svg>
                    </div>
                    <p className="font-medium">{name}</p>
                    <p className="font-extralight line-clamp-3">{character}</p>
                </div>

            </div>
        );
    }

    function NoCastData(): JSX.Element {
        return (
            <p className="card-cast w-full h-full text-lg lg:text-xl font-light text-center translate-y-14 opacity-0">
                No cast data.
            </p>
        );
    }

    function CastELements(): JSX.Element[] | JSX.Element {
        if (credits.cast.length > 0) {
            return credits.cast.map((cast, i): JSX.Element => {
                const { profile_path, character, name } = cast;
                return profile_path ? (
                    <CastWithImage
                        key={i}
                        profile_path={profile_path}
                        character={character}
                        name={name}
                        index={i}
                    />
                ) : (
                    <CastNoImage key={i} character={character} name={name} index={i} />
                );
            });
        } else {
            return <NoCastData />;
        }
    }

    return (
        <section className="flex items-center lg:h-[90svh] px-[2%] lg:snap-start">
            <h2 className="relative w-[30%] text-3xl md:text-6xl font-robotoCondensed font-normal">
                Cast
                <span className="gallery-title-underline-cast block mt-1 border-b w-0"></span>
            </h2>

            <div className="w-[70%]">
                {hasCast && (
                    <div className="arrows-cast flex justify-end items-center gap-3 opacity-0">
                        <button
                            ref={leftArrowRef}
                            onClick={scrollLeft}
                            title="Scroll casts left"
                            aria-label="Scroll casts left"
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
                            title="Scroll casts right"
                            aria-label="Scroll casts right"
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
                    className="gallery lg:snap-x lg:snap-mandatory overflow-x-auto"
                    ref={galleryRef}
                    onScroll={changeArrowOpacity}
                >
                    <div className="cards-cntr flex gap-2 md:gap-5 pl-4 py-2" data-gallery="cast">
                        <CastELements />
                    </div>
                </div>
            </div>
        </section>
    );
}
