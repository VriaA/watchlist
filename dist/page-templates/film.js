import imageBaseUrl from "../utils/imageBaseUrl.js"

export default function getFilmHTML(film, type, path) {
    const {genres, runtime, episode_run_time, release_date, first_air_date, title, original_title, name, original_name, overview, original_language, number_of_seasons, credits, videos, similar} = film
    const language = getLanguage(original_language)

    const isTv = type === 'tv'
    const hasCast = credits.cast.length > 0
    const hasVideos = videos.results.length > 0
    const hasSimilarFilm = similar.results.length > 0
    const hasGenre = genres.length > 0
    const hasEpisodeRunTime = episode_run_time && episode_run_time.length > 0
    const episodeRunTime = hasEpisodeRunTime ? episode_run_time[0] : null

    return ` <div id="film-cntr" class="w-[100svw] h-[100svh] bg-fixed bg-cover bg-filmCntrImgPosition md:bg-filmCntrImgPositionMd bg-blend-overlay bg-zinc-900 text-slate-100 overflow-hidden"> 

                <div id="loader" class="fixed top-0 left-0 w-screen h-screen bg-zinc-950 z-50  flex items-center justify-center">
                    <div class="absolute w-10 h-10 md:w-20 md:h-20 bg-red-800 rounded-full animate-leftPreload md:animate-leftPreloadMd"></div>
                    <div class="absolute w-10 h-10 md:w-20 md:h-20 bg-slate-100/10 rounded-full backdrop-blur-sm animate-rightPreload md:animate-rightPreloadMd"></div>
                </div>
                <div class="grid place-content-center w-full h-full backdrop-blur-md">

                    <div id="film" class="relative w-[95svw] md:w-[90svw] max-w-7xl h-[95svh] md:h-[90svh] bg-cover rounded-lg font-inter bg-filmBackdropPosition bg-zinc-800 bg-blend-overlay overflow-y-auto overflow-x-hidden">
                                    
                        <header class="absolute flex justify-end items-center gap-4 w-full p-[4%] md:p-[2%]">
                        
                            <nav class="flex justify-end items-center gap-4">

                                    <form id="search-bar" class="relative h-10 min-w-[38px] cursor-pointer" title="Search">
                                    
                                        <span id="search-icon" class="material-symbols-outlined absolute inset-0 my-auto left-2 z-50 w-fit h-fit text-3xl font-light md:font-extralight transition-transform hover:-translate-y-1 active:translate-y-1">
                                            search 
                                        </span> 

                                        <fieldset id="search-fieldset" class="hidden relative w-1 h-full px-2 z-20 bg-zinc-900/30 backdrop-blur-md rounded-2xl overflow-hidden border border-stone-900/30">
                                                <input id="search-input" class="w-full h-full ml-2 px-10 font-light bg-transparent text-[10px] min-[375px]:text-sm md:text-base caret-slate-100 outline-none border-none" 
                                                                        type="text" aria-label="Search Bar" name="Movie Title" placeholder="Movie or TV show title" autocomplete="off">
                                        </fieldset> 
                                        <ul id="suggestions" class="to-hide films search-suggestions invisible z-10">
                                        </ul>   
                                    </form>

                                    <a class="nav-link static md:font-light" href="#/watchlist">
                                        My watchlist
                                    </a>
                            </nav> 
                        </header>

                        <main class="h-full">
                            <div class="min-h-[100%] flex flex-col gap-12 md:gap-0 justify-end md:flex-row md:justify-between md:items-center mt-5 p-[4%] pb-[10%] md:p-[2%]  font-inter font-normal md:font-light md:tracking-wide">

                                <section class="text-to-reveal flex flex-col gap-2 md:gap-4 md:w-[50%]">
                                    <h1 class="text-4xl md:text-5xl lg:text-7xl font-robotoCondensed font-medium capitalize">${(title || original_title) || (name || original_name)}</h1>

                                    <div class="flex flex-wrap gap-3 items-center text-sm md:text-base">
                                        <p>${getGenres(genres, hasGenre)}</p>

                                        <span class="text-[8px] md:text-[5px]">&#9679;</span>

                                        <p>${getRuntime(runtime || episodeRunTime)} mins</p>

                                        <span class="text-[8px] md:text-[5px]">&#9679;</span>

                                        <p>${getYear(release_date || first_air_date)}</p>
                                    </div>

                                    <p id="overview" class="md:text-lg max-h-[150px] md:max-h-[170px] line-clamp-3 cursor-pointer"> 
                                        ${overview}
                                    </p>

                                    <div class="flex flex-wrap gap-3 items-center text-sm md:text-base">
                                        <p class="flex items-center h-fit">Language: ${language}</p>

                                        <span class="text-[8px] md:text-[5px]">&#9679;</span>

                                        <p>${getType(type)}</p>

                                        ${isTv ? `
                                                <p class="text-[8px] md:text-[5px]">&#9679;</p>
                                                <p class="flex items-center h-fit">${number_of_seasons} season${number_of_seasons > 1 ? 's' : ''}</p>`
                                        : ''}
                                    </div>

                                </section>

                                <section class="film-cta-btn-cntr md:w-[45%]">
                                    <div class="relative z-[5] flex justify-end md:justify-center items-center gap-2">
                                        <div id="film-cta-btn" class="film-cta-btn group" data-film='${JSON.stringify(setWatchlistInfo(film, type))}'>
                                            <span id="film-cta-icon" class="material-symbols-outlined text-3xl font-medium md:text-5xl text-zinc-900 group-hover:text-red-900/90"
                                                                    data-film='${JSON.stringify(setWatchlistInfo(film, type))}'>
                                                playlist_add
                                            </span>
                                        </div>

                                        <h3 id="film-cta-text" class="md:text-lg">Add to watchlist</h3>
                                    </div>

                                    <div class="absolute left-6 bottom-2 md:left-auto md:right-2 flex gap-2">
                                        <div class="grid grid-cols-1 grid-rows-1">
                                            <span class="col-start-1 col-end-2 row-start-1 row-end-1 justify-self-center z-10 block w-[2px] h-14 bg-zinc-900 opacity-60"></span>
                                            <span id="scroll-indicator-thumb" class="col-start-1 col-end-2 row-start-1 row-end-1 justify-self-center z-20 block w-[3px] h-6 bg-red-800 rounded-sm"></span>
                                        </div>
                                        <p class="self-end w-6 md:w-14 leading-none font-robotoCondensed font-normal md:font-light text-sm md:tracking-wide">Scroll down</p>
                                    </div>
                                </section>
                            </div>

                            <div class="flex flex-col justify-center py-16 lg:py-0 gap-16 lg:gap-0 min-h-full bg-zinc-900/40 backdrop-blur-md rounded-md">

                                <section class="flex items-center lg:h-[90svh] px-[2%]">
                                    <h2 class="relative w-[30%] text-3xl md:text-6xl font-robotoCondensed font-normal">
                                        Cast
                                        <span class="gallery-title-underline-cast block mt-1 border-b"><span>
                                    </h2>

                                    <div class="w-[70%] gallery-cntr hide-film-gallery" data-gallery="cast">

                                        ${hasCast ? `<div class="arrows-cast flex justify-end items-end gap-3">
                                                    <span id="cast-left-arrow" class="left-arrow scroll-arrow-small material-symbols-outlined" data-arrow="cast" title="Previous">
                                                        keyboard_arrow_left
                                                    </span> 
                                                    <span id="cast-right-arrow" class="right-arrow scroll-arrow-small material-symbols-outlined" data-arrow="cast" title="Next">
                                                        keyboard_arrow_right
                                                    </span> 
                                        </div>` : ''}

                                        <div id="gallery-cast" class="gallery overflow-x-auto" data-gallery="cast">

                                            <div class="cards-cntr flex gap-2 md:gap-5 pl-4 py-2">
                                                ${getCastHTML(credits)}
                                            </div>  
                                        </div>  
                                    </div>
                                </section>
                            
                                <section class="flex items-center lg:h-[90svh] px-[2%]">

                                    <h2 class="relative w-[30%] text-3xl md:text-6xl font-robotoCondensed font-normal">
                                        Videos
                                        <span class="gallery-title-underline-videos block mt-1 border-b"><span>    
                                    </h2>

                                    <div class="w-[70%] gallery-cntr hide-film-gallery" data-gallery="videos">

                                    ${hasVideos ? 
                                        `<div class="arrows-videos flex justify-end items-end gap-3 pl-4">
                                            <span id="videos-left-arrow" class="left-arrow scroll-arrow-small material-symbols-outlined" data-arrow="videos" title="Previous">
                                                keyboard_arrow_left
                                            </span>
                                            <span id="videos-right-arrow" class="right-arrow scroll-arrow-small material-symbols-outlined" data-arrow="videos" title="Next">
                                                keyboard_arrow_right
                                            </span>
                                        </div>` 
                                    : ''}

                                        <div id="gallery-videos" class="gallery overflow-x-auto pl-2 md:px-4" data-gallery="videos">

                                            <div class="cards-cntr flex gap-2 md:gap-3 py-2">
                                                ${getVideoHTML(videos)}
                                            </div>
                                        </div>
                                    </div>    
                                </section>

                                <section class="flex items-center lg:h-[90svh] px-[2%]">

                                    <h2 class="relative w-[30%] text-3xl md:text-6xl font-robotoCondensed font-normal">
                                        Similar
                                        <span class="gallery-title-underline-similar block mt-1 border-b"><span>
                                    </h2>

                                    <div class="w-[70%] gallery-cntr hide-film-gallery" data-gallery="similar">

                                    ${hasSimilarFilm ? 
                                        `<div class="arrows-similar flex justify-end items-end gap-3 pl-4">
                                            <span id="similar-left-arrow" class="material-symbols-outlined left-arrow scroll-arrow-small" data-arrow="similar" title="Previous">
                                                keyboard_arrow_left
                                            </span>
                                            <span id="similar-right-arrow" class="material-symbols-outlined right-arrow scroll-arrow-small" data-arrow="similar" title="Next">
                                                keyboard_arrow_right
                                            </span>
                                        </div>` 
                                    : ''}

                                        <div id="gallery-similar" class="gallery overflow-x-auto pl-2 md:px-4" data-gallery="similar">

                                            <div class="films cards-cntr flex gap-2 md:gap-3 py-2">
                                                ${hasSimilarFilm ? similarFilmPoster(similar.results, type, path) : setNoSimilarFilmMessage()}
                                            </div>
                                        </div>
                                    </div> 
            
                                </section>
                            </div>
                        </main>
                    </div>
                </div>
            </div>`
}

function setUnknownValuePlaceHolder() {
    return `<span class="material-symbols-outlined text-sm md:text-base font-light">
                unknown_med
            </span>`
}

function getGenres(genres, hasGenre) {
     return hasGenre ? genres.map( (genre)=> `${genre.name}`).join(' | ') : setUnknownValuePlaceHolder()
}

function getYear(date) {
    return date ? date.split('-')[0] : setUnknownValuePlaceHolder()
}

const iso639_1LanguageCodes = {
    aa: "Afar",
    ab: "Abkhazian",
    af: "Afrikaans",
    ak: "Akan",
    am: "Amharic",
    an: "Aragonese",
    ar: "Arabic",
    as: "Assamese",
    av: "Avaric",
    ay: "Aymara",
    az: "Azerbaijani",
    ba: "Bashkir",
    be: "Belarusian",
    bg: "Bulgarian",
    bh: "Bihari languages",
    bi: "Bislama",
    bm: "Bambara",
    bn: "Bengali",
    bo: "Tibetan",
    br: "Breton",
    bs: "Bosnian",
    ca: "Catalan",
    ce: "Chechen",
    ch: "Chamorro",
    cn: "Chinese",
    co: "Corsican",
    cr: "Cree",
    cs: "Czech",
    cu: "Church Slavic",
    cv: "Chuvash",
    cy: "Welsh",
    da: "Danish",
    de: "German",
    dv: "Divehi",
    dz: "Dzongkha",
    ee: "Ewe",
    el: "Greek",
    en: "English",
    eo: "Esperanto",
    es: "Spanish",
    et: "Estonian",
    eu: "Basque",
    fa: "Persian",
    ff: "Fulah",
    fi: "Finnish",
    fj: "Fijian",
    fo: "Faroese",
    fr: "French",
    ga: "Irish",
    gd: "Gaelic",
    gl: "Galician",
    gn: "Guarani",
    gu: "Gujarati",
    gv: "Manx",
    ha: "Hausa",
    he: "Hebrew",
    hi: "Hindi",
    ho: "Hiri Motu",
    hr: "Croatian",
    ht: "Haitian",
    hu: "Hungarian",
    hy: "Armenian",
    hz: "Herero",
    ia: "Interlingua",
    id: "Indonesian",
    ie: "Interlingue",
    ig: "Igbo",
    ii: "Sichuan Yi",
    ik: "Inupiaq",
    io: "Ido",
    is: "Icelandic",
    it: "Italian",
    iu: "Inuktitut",
    ja: "Japanese",
    jv: "Javanese",
    ka: "Georgian",
    kg: "Kongo",
    ki: "Kikuyu",
    kj: "Kuanyama",
    kk: "Kazakh",
    kl: "Kalaallisut",
    km: "Central Khmer",
    kn: "Kannada",
    ko: "Korean",
    kr: "Kanuri",
    ks: "Kashmiri",
    ku: "Kurdish",
    kv: "Komi",
    kw: "Cornish",
    ky: "Kirghiz",
    la: "Latin",
    lb: "Luxembourgish",
    lg: "Ganda",
    li: "Limburgan",
    ln: "Lingala",
    lo: "Lao",
    lt: "Lithuanian",
    lu: "Luba-Katanga",
    lv: "Latvian",
    mg: "Malagasy",
    mh: "Marshallese",
    mi: "Maori",
    mk: "Macedonian",
    ml: "Malayalam",
    mn: "Mongolian",
    mr: "Marathi",
    ms: "Malay",
    mt: "Maltese",
    my: "Burmese",
    na: "Nauru",
    nb: "Bokmål, Norwegian; Norwegian Bokmål",
    nd: "Ndebele, North; North Ndebele",
    ne: "Nepali",
    ng: "Ndonga",
    nl: "Dutch; Flemish",
    nn: "Norwegian Nynorsk; Nynorsk, Norwegian",
    no: "Norwegian",
    nr: "Ndebele, South; South Ndebele",
    nv: "Navajo; Navaho",
    ny: "Chichewa; Chewa; Nyanja",
    oc: "Occitan (post 1500)",
    oj: "Ojibwa",
    om: "Oromo",
    or: "Oriya",
    os: "Ossetian; Ossetic",
    pa: "Punjabi",
    pi: "Pali",
    pl: "Polish",
    ps: "Pushto; Pashto",
    pt: "Portuguese",
    qu: "Quechua",
    rm: "Romansh",
    rn: "Rundi",
    ro: "Romanian; Moldavian; Moldovan",
    ru: "Russian",
    rw: "Kinyarwanda",
    sa: "Sanskrit",
    sc: "Sardinian",
    sd: "Sindhi",
    se: "Northern Sami",
    sg: "Sango",
    si: "Sinhala; Sinhalese",
    sk: "Slovak",
    sl: "Slovenian",
    sm: "Samoan",
    sn: "Shona",
    so: "Somali",
    sq: "Albanian",
    sr: "Serbian",
    ss: "Swati",
    st: "Sotho, Southern",
    su: "Sundanese",
    sv: "Swedish",
    sw: "Swahili",
    ta: "Tamil",
    te: "Telugu",
    tg: "Tajik",
    th: "Thai",
    ti: "Tigrinya",
    tk: "Turkmen",
    tl: "Tagalog",
    tn: "Tswana",
    to: "Tonga (Tonga Islands)",
    tr: "Turkish",
    ts: "Tsonga",
    tt: "Tatar",
    tw: "Twi",
    ty: "Tahitian",
    ug: "Uighur; Uyghur",
    uk: "Ukrainian",
    ur: "Urdu",
    uz: "Uzbek",
    ve: "Venda",
    vi: "Vietnamese",
    vo: "Volapük",
    wa: "Walloon",
    wo: "Wolof",
    xh: "Xhosa",
    yi: "Yiddish",
    yo: "Yoruba",
    za: "Zhuang; Chuang",
    zh: "Chinese",
    zu: "Zulu"
}

function getLanguage(code) {
    if(iso639_1LanguageCodes[code]) {
        return iso639_1LanguageCodes[code]
    }
    return setUnknownValuePlaceHolder()
}

function getRuntime(time) {
    return time ? time : setUnknownValuePlaceHolder()
}

function getType(type) {
    return type ? type === 'movie' ? 'Movie' : 'Series' : setUnknownValuePlaceHolder()
}

function getCastHTML(credits) {
    if(credits.cast.length === 0) {
        return `<p class="card-cast w-full h-full text-lg lg:text-xl font-light text-center">
                    No cast data.
                </p>`
    }

   return credits.cast.map(cast=> {
        const {profile_path, character, name} = cast
        if(!profile_path) {
            return `<div class="card card-cast snap-start flex flex-col flex-none gap-1 w-[49%] lg:w-[32%] bg-zinc-900/40 backdrop-blur-md rounded-md pb-2 text-center">
                        <div class="grid place-content-center w-full h-48 md:h-72 rounded-t-md">
                            <span class="material-symbols-outlined text-5xl lg:text-7xl font-thin">
                                broken_image
                            </span>
                        </div>
                        <p class="font-medium">${name}</p>
                        <p class="font-extralight">${character}</p>
                    </div>`
        }
    return `<div class="card card-cast snap-start flex flex-col flex-none gap-1 w-[49%] lg:w-[32%] bg-zinc-900/40 backdrop-blur-md rounded-md pb-2 text-center">
                <img class="w-full h-48 md:h-72 object-cover object-center rounded-t-md" src="${imageBaseUrl}${profile_path}" alt="${name}" loading="lazy">
                <p class="font-medium">${name}</p>
                <p class="font-extralight">${character}</p>
            </div>`
    }).join('')
}

function getVideoHTML(videos) {
    if(videos.results.length === 0) {
        return `<p class="card-videos w-full h-full text-lg lg:text-xl font-light text-center">
                    No videos.
                </p>`
    }
    return videos.results.map(video=> {
         const {id, key} = video
     return `<iframe class="card card-videos snap-start flex-none w-[100%] lg:w-[50%] h-80 rounded-md"
                     src="https://www.youtube.com/embed/${key}?si=${id}" title="YouTube video player" loading="lazy"
                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
     }).join('')
 }

 function setNoSimilarFilmMessage() {
        return `<p class="card-similar w-full h-full text-lg lg:text-xl font-light text-center">
                    No similar film.
                </p>`
 }

function similarFilmPoster(results, type) {
    return  results.map(result=> {
        const {id, media_type, name, original_name, original_title, title, poster_path} = result
            if(!poster_path) {
                return `<span class="card card-similar relative w-[49%] min-h-[245px] lg:w-[242px] lg:h-[350px] no-poster" data-id="${id}" data-type="${media_type || type}">
                            <span class="absolute inset-0 m-auto h-fit w-fit material-symbols-outlined text-5xl lg:text-7xl text-white font-thin" data-id="${id}" data-type="${media_type || type}">
                                broken_image
                            </span>
                            <p class="text-xs lg:text-sm capitalise font-normal p-2" data-result-id="${id}" data-result-type="${media_type || type}">
                                ${(name || original_name) || (title || original_title)}
                            </p>
                        </span>`
            } 
            return  `<span class="card card-similar group grid z-[5] w-[49%] min-h-[245px] lg:w-[242px] lg:h-[350px] flex-none overflow-hidden cursor-pointer rounded-md snap-start">

                            <span class="inline-block col-start-1 row-start-1 z-[2] min-h-[245px] lg:w-[242px] lg:h-[350px] flex-none bg-zinc-800/60 animate-pulse">
                            </span>

                            <img class="inline-block col-start-1 row-start-1 z-[3] w-full h-full object-cover object-center" src="${imageBaseUrl}${poster_path}" alt="${(name || original_name) || (title || original_title)}" loading="lazy">
                            
                            <span class="card film-name-poster min-h-[245px] lg:w-[242px] lg:h-[350px]" data-id="${id}" data-type="${media_type || type}">
                                ${(name || original_name) || (title || original_title)}
                            </span>
                    </span>`
    }).join('')
}

function  setWatchlistInfo(filmToSave, type) {
    const {id, poster_path, runtime, episode_run_time, release_date, first_air_date, original_title, original_name, watched} = filmToSave
    const hasEpisodeRunTime = episode_run_time && episode_run_time.length > 0
    const episodeRunTime = hasEpisodeRunTime ? episode_run_time[0] : null

    return {
        id: id,
        type: getType(type),
        poster: poster_path,
        title: original_name ? original_name.replace(/'/g, "&apos;") : original_title.replace(/'/g, "&apos;"),
        year: getYear(release_date ||first_air_date),
        runtime: getRuntime(runtime || episodeRunTime),
        watched: watched
    }
} 