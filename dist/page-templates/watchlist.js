import store from '../store.js'
import imageBaseUrl from '../utils/imageBaseUrl.js'
import EmptyWatchlistMessage from '../components/EmptyWatchlistMessage.js'

export function getWatchlistHTML() {
    const watchlist = store.getState()
    const hasWatchlist = watchlist.length > 0
        return `<div class="page-wrapper bg-homeImg bg-wrapperImgPosition md:bg-wrapperImgPositionMd">
        
                <div id="loader" class="fixed top-0 left-0 w-screen h-screen bg-zinc-950 z-50 hidden lg:flex items-center justify-center">
                    <div class="absolute w-10 h-10 md:w-20 md:h-20 bg-red-800 rounded-full animate-leftPreload md:animate-leftPreloadMd"></div>
                    <div class="absolute w-10 h-10 md:w-20 md:h-20 bg-slate-100/10 rounded-full backdrop-blur-sm animate-rightPreload md:animate-rightPreloadMd"></div>
                </div>

                <div id="films-wrapper" class="content-cntr flex flex-col items-center overflow-y-auto">

                    <header class="w-full mb-[3svh] lg:mb-[4svh]">
                    <nav class="flex justify-between gap-2 w-full font-robotoCondensed mt-4">
                            <section class="flex flex-col gap-4">
                                <h1 id="heading" class="text-2xl md:text-3xl uppercase font-inter font-medium">My watchlist</h1>
                                        
                                <form id="filters" class="${!hasWatchlist ? 'hidden' : ''} flex gap-2 text-sm md:text-base flex-wrap">
                                    <input type="radio" id="all-btn" class="hidden peer/all" name="filter" checked>
                                    <label for="all-btn" class="watchlist-filter peer-checked/all:bg-zinc-100 peer-checked/all:text-zinc-900">
                                        All
                                    </label>

                                    <input type="radio" id="watched-btn" class="hidden peer/watched" name="filter">
                                    <label for="watched-btn" class="watchlist-filter peer-checked/watched:bg-zinc-100 peer-checked/watched:text-zinc-900">Watched</label>

                                    <input type="radio" id="not-watched-btn" class="hidden peer/not-watched" name="filter">
                                    <label for="not-watched-btn" class="watchlist-filter peer-checked/not-watched:bg-zinc-100 peer-checked/not-watched:text-zinc-900">Not watched</label>
                                </form>
                            </section>
                            
                            <a class="nav-link static self-end" href="/">Find your film</a>
                        </nav>
                    </header>

                    <main class="films grid gap-3 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
                        ${hasWatchlist ? savedFilm() : EmptyWatchlistMessage()}
                    </main>
                </div>
                </div>`
    
}

function savedFilm() {
    const watchlist = store.getState()
    return watchlist.map(film=> {
        const {id, type, title, runtime, watched, year} = film

        return`<section id="saved-film-${id}" class="saved-film ${watched ? 'watched' : 'not-watched'} relative z-10 pb-2 bg-zinc-800/20 font-robotoCondensed font-normal lg:font-light text-xs md:text-sm backdrop-blur-md rounded-md overflow-hidden">

                <div id="watched-check-icon-${id}" class="${watched ? 'visible' : 'invisible'} absolute top-2 left-2 z-50">
                    <i class="fa-solid fa-circle-check drop-shadow-blackOutline z-50 text-xl lg:text-2xl text-slate-100"></i> 
                </div>

                <div class="relative z-40 text-base lg:text-lg">
                    ${getSavedFilmImage(film)}
                    
                    <ul id="saved-film-options-cntr-${id}" class="to-hide invisible absolute bottom-0 right-0 p-2 flex flex-col gap-2 bg-zinc-900 rounded-tl-md z-50" data-saved-film-options-cntr="${id}" data-to-hide=${id}>
                        <li class="flex items-center gap-1 cursor-pointer hover:text-red-700" data-remove-film="${id}">
                            Remove <i class="fa-regular fa-trash-can text-xs lg:text-sm text-red-700"></i>
                        </li>

                        <li class="flex items-center gap-1">
                            <label id="watch-status-label-${id}" for="watch-status-checkbox-${id}" class="cursor-pointer ${watched ? 'hover:text-amber-500' : 'hover:text-green-700'}" data-change-watch-status="${id}">
                                ${watched ? 'Not watched' : 'Watched'} <i class="fa-regular ${watched ? 'fa-circle-xmark' : 'fa-circle-check'} text-xs lg:text-sm ${watched ? 'text-amber-500' : 'text-green-700'}"></i>
                            </label>
                            <input id="watch-status-checkbox-${id}" class="watch-status hidden" type="checkbox"  ${watched ? 'checked' : ''}>
                        </li>
                    </ul>
                </div>

                <div class="flex flex-col gap-1 px-2 py-4">
                    <div class="relative flex justify-between items-center">
                        <h2 class="w-4/5 h-5 lg:h-6 text-sm lg:text-base font-semibold lg:font-normal line-clamp-1 overflow-hidden cursor-pointer">${title}</h2>
                        <span id="saved-film-options-btn-${id}" class="to-hide-visibility-toggler-${id} absolute self-center right-0 flex items-center text-xl font-semibold cursor-pointer"data-options-btn="${id}">
                            &#8943;
                        </span>
                    </div>
                    
                    <div class="flex justify-between items-center gap-2">
                        <div class="flex items-center gap-2">
                            <p>${year}</p>
                            <span class="text-[8px] lg:text-[10px]">&#9679;</span>
                            <p>${runtime} mins</p>
                        </div>
                        <p class="px-2 py-[2px] bg-zinc-900/40 backdrop-blur-sm border rounded-md">${type}</p>
                    </div>
                </div>
            </section>`
    }).join('')
}

function getSavedFilmImage(film) {

    const {poster, id, type, title} = film

    if(poster) {
        return `<div class="grid grid-cols-1 grid-rows-1 min-h-[200px]">
                    <img class="col-start-1 row-start-1 z-[8] object-cover object-center rounded-t-md cursor-pointer" src="${imageBaseUrl}${poster}" alt="${title}" title="${title}" data-id="${id}" data-type="${type === 'Movie' ? 'movie' : 'tv'}" loading="lazy"></img>
                    <span class="block col-start-1 row-start-1 z-[7] h-full bg-zinc-900/40 animate-pulse"><span>
                </div>`
    } else {
        return `<span class="flex items-center justify-center min-h-[200px] bg-zinc-800/40 cursor-pointer" data-film-id="${id}" data-film-type="${type === 'Movie' ? 'movie' : 'tv'}">
                    <span class="material-symbols-outlined text-5xl lg:text-7xl font-thin">
                        broken_image
                    </span>
                </span>`
    }
}
