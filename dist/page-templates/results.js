import imageBaseUrl from "../utils/imageBaseUrl.js"

export default function getResultsHtml(results) {

    return ` <div class="page-wrapper bg-homeImg bg-wrapperImgPosition md:bg-wrapperImgPositionMd">
                <div id="results-wrapper" class="content-cntr overflow-y-auto md:overflow-hidden">
                <div class="h-full flex flex-col md:justify-evenly">
                    <header id="results-header" class="z-50">
                        <div class="w-full h-fit flex flex-col md:flex-row items-start md:items-center justify-center lg:justify-start gap-4 mt-10"> 
                            <h1 class="font-medium text-slate-100 text-3xl uppercase"><a href="/">Find your film</a></h1>
                            
                            <form id="search-bar" class="relative w-[90%] lg:w-[500px]">
                                <span id="search-icon" class="material-symbols-outlined absolute inset-0 my-auto w-fit h-fit left-2 z-50 self-center text-2xl md:text-3xl font-extralight">
                                    search
                                </span> 

                                <fieldset class="relative z-40 flex justify-between h-10 bg-zinc-900/40 rounded-2xl overflow-hidden border border-stone-900/30">
                                <input id="search-input" class="w-full h-full px-10 md:pl-12 bg-transparent text-[10px] min-[375px]:text-sm md:text-base outline-none border-none" 
                                                         type="text" aria-label="Search Bar" name="Movie Title" placeholder="Movie or TV show title" autocomplete="off">
                                </fieldset>
                                <ul id="suggestions" class="to-hide films search-suggestions invisible z-30">
                                </ul>                                           
                            </form>
                        </div>
                        
                        <a class="nav-link" href="#/watchlist">My watchlist</a>
                    </header> 

                    <main class="gallery-cntr relative z-20 flex items-center justify-center w-full min-h-[300px] pt-4 lg:mt-[2%]">
                        ${getMainHtml(results)}
                    </main>
                </div>
                </div>
            </div>`
}

function getMainHtml(results) {
   
    if(results && results.length > 0) {
        return  `<div id="back-btn" class="cursor-pointer">
                    <span id="results-left-arrow" class="left-arrow material-symbols-outlined hidden lg:inline-block text-5xl md:text-7xl font-light" data-arrow="results">
                        keyboard_arrow_left
                    </span>
                </div>

                <div id="gallery-results" class="grid z-20 gallery min-w-full h-full lg:pl-2 lg:min-w-[248px] lg:max-w-[66%] rounded-md overflow-x-scroll overflow-y-auto lg:overflow-y-hidden" data-gallery="results">
                    <div class="films cards-cntr w-full h-full grid grid-cols-2 md:grid-cols-3 lg:flex ${results.length > 2 ? 'justify-center' : ''} lg:justify-start gap-2 md:gap-5 md:mb-5 lg:mb-0 lg:py-5">
                        ${Poster(results)}
                    </div>
                </div>

                <div id="results-right-arrow" class="cursor-pointer">
                    <span class=" right-arrow hidden lg:inline-block material-symbols-outlined text-5xl md:text-7xl font-light" data-arrow="results">
                        keyboard_arrow_right
                    </span>
                </div>`
    } else {
        return `<div class="absolute inset-0 w-2/3 h-fit m-auto flex flex-col items-center text-center gap-2">
                    <p class="text-base font-semibold">Unable to find what you&apos;re looking for.</p>
                    <span class="material-symbols-outlined text-5xl font-medium">error</span>
                </div>`
    }
}

function Poster(results, type) {
    return  results.map(result=> {
        const {id, media_type, name, original_name, original_title, title, poster_path} = result
            if(!poster_path) {
                return `<span class="card relative min-h-[245px] lg:w-[242px] lg:h-[350px] no-poster" data-id="${id}" data-type="${media_type || type}">
                            <span class="absolute inset-0 m-auto h-fit w-fit material-symbols-outlined text-5xl lg:text-7xl text-white font-thin" data-id="${id}" data-type="${media_type || type}">
                                broken_image
                            </span>
                            <p class="text-xs lg:text-sm capitalise font-normal p-2" data-result-id="${id}" data-result-type="${media_type || type}">
                                ${(name || original_name) || (title || original_title)}
                            </p>
                        </span>`
            } 
            return  `<span class="group grid z-[5] card min-h-[245px] lg:w-[242px] lg:h-[350px] flex-none overflow-hidden cursor-pointer rounded-md snap-start">
                            <span class="inline-block col-start-1 row-start-1 z-[2] min-h-[245px] lg:w-[242px] lg:h-[350px] flex-none bg-zinc-800/60 animate-pulse"></span>
                            <img class="inline-block col-start-1 row-start-1 z-[3] w-full h-full object-cover object-center" src="${imageBaseUrl}${poster_path}" alt="${(name || original_name) || (title || original_title)}">
                            <span class="card film-name-poster min-h-[245px] lg:w-[242px] lg:h-[350px]" data-id="${id}" data-type="${media_type || type}">
                                ${(name || original_name) || (title || original_title)}
                            </span>
                    </span>`
    }).join('')
}