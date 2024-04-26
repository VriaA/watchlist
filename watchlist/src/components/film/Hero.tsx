import { iso639_1LanguageCodes } from "../../data/iso639LanguageCodes"
import { TMovie, TSeries } from "../../types/filmTypes"

export default function Hero({ film, type }: {film: TMovie | TSeries, type: string}) {
    const { title, original_title, genres, runtime, release_date, overview, original_language } = film as TMovie
    const {name, original_name, first_air_date, number_of_seasons, episode_run_time} = film as TSeries
    
    const language = getLanguage(original_language)

    const isTv: boolean = type === 'tv'
    const hasGenre: boolean = genres && genres.length > 0
    const hasEpisodeRunTime: boolean = episode_run_time && episode_run_time.length > 0
    const episodeRunTime: number | null = hasEpisodeRunTime ? episode_run_time[0] : null

    function getGenres(genres: {id: number; name: string;}[], hasGenre: boolean): string | JSX.Element {
        return hasGenre ? genres.map( (genre)=> `${genre.name}`).join(' | ') : unknownValuePlaceHolder()
   }
   
   function getYear(date: string): string | JSX.Element {
       return date ? date.split('-')[0] : unknownValuePlaceHolder()
   }
   
   function getLanguage(code: keyof typeof iso639_1LanguageCodes): string | JSX.Element {
       if(iso639_1LanguageCodes[code]) {
           return iso639_1LanguageCodes[code]
       }
       return unknownValuePlaceHolder()
   }
   
   function getRuntime(time: number | null): number | JSX.Element {
       return time ? time : unknownValuePlaceHolder()
   }
   
   function getType(type: string): 'Movie' | 'Series' | JSX.Element {
       return type ? type === 'movie' ? 'Movie' : 'Series' : unknownValuePlaceHolder()
   }

   function unknownValuePlaceHolder(): JSX.Element {
        return (
                    <span className="material-symbols-outlined text-sm md:text-base font-light">
                        unknown_med
                    </span>
                )
    }

    // TODO: Create add to watchlist function
    // function  setWatchlistInfo(filmToSave, type) {
    //     const {id, poster_path, runtime, episode_run_time, release_date, first_air_date, original_title, original_name, watched} = filmToSave
    //     const hasEpisodeRunTime = episode_run_time && episode_run_time.length > 0
    //     const episodeRunTime = hasEpisodeRunTime ? episode_run_time[0] : null
    
    //     return {
    //         id: id,
    //         type: getType(type),
    //         poster: poster_path,
    //         title: original_name ? original_name.replace(/'/g, "&apos;") : original_title.replace(/'/g, "&apos;"),
    //         year: getYear(release_date ||first_air_date),
    //         runtime: getRuntime(runtime || episodeRunTime),
    //         watched: watched
    //     }
    // } 

    return (
        <div className="min-h-[100%] flex flex-col gap-12 md:gap-0 justify-end md:flex-row md:justify-between md:items-center mt-5 p-[4%] pb-[10%] md:p-[2%]  font-inter font-normal md:font-light md:tracking-wide">
            <section className="text-to-reveal flex flex-col gap-2 md:gap-4 md:w-[50%]">
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-robotoCondensed font-medium capitalize">{(title || original_title) || (name || original_name)}</h1>

                <div className="flex flex-wrap gap-3 items-center text-sm md:text-base">
                    <p>{getGenres(genres, hasGenre)}</p>
                    <span className="text-[8px] md:text-[5px]">&#9679;</span>
                    <p>{getRuntime(runtime || episodeRunTime)} mins</p>
                    <span className="text-[8px] md:text-[5px]">&#9679;</span>
                    <p>{getYear(release_date || first_air_date)}</p>
                </div>

                <p id="clampable-{id}" className="md:text-lg max-h-[150px] md:max-h-[170px] line-clamp-3 cursor-pointer"> 
                    {overview}
                </p>

                <div className="flex flex-wrap gap-3 items-center text-sm md:text-base">
                    <p className="flex items-center h-fit">Language: {language}</p>

                    <span className="text-[8px] md:text-[5px]">&#9679;</span>

                    <p>{getType(type)}</p>

                    {isTv && <>
                                <p className="text-[8px] md:text-[5px]">&#9679;</p>
                                <p className="flex items-center h-fit">{number_of_seasons} season{number_of_seasons > 1 ? 's' : ''}</p>
                            </>
                    }
                </div>
            </section>

            <section className="film-cta-btn-cntr md:w-[45%]">
                <div className="relative z-[5] flex justify-end md:justify-center items-center gap-2">
                    <div id="film-cta-btn" className="film-cta-btn group">
                        <span id="film-cta-icon" className="material-symbols-outlined text-3xl font-medium md:text-5xl text-zinc-900 group-hover:text-red-900/90">
                            playlist_add
                        </span>
                    </div>

                    <h3 id="film-cta-text" className="md:text-lg">Add to watchlist</h3>
                </div>

                <div className="absolute left-6 bottom-2 md:left-auto md:right-2 flex gap-2">
                    <div className="grid grid-cols-1 grid-rows-1">
                        <span className="col-start-1 col-end-2 row-start-1 row-end-1 justify-self-center z-10 block w-[2px] h-14 bg-zinc-900 opacity-60"></span>
                        <span id="scroll-indicator-thumb" className="col-start-1 col-end-2 row-start-1 row-end-1 justify-self-center z-20 block w-[3px] h-6 bg-red-800 rounded-sm"></span>
                    </div>
                    <p className="self-end w-6 md:w-14 leading-none font-robotoCondensed font-normal md:font-light text-sm md:tracking-wide">Scroll down</p>
                </div>
            </section>
        </div>
    )
}