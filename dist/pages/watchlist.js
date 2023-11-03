import { reenableResultsPageAnimation } from '../animations/results.js'
import view from '../utils/view.js'
import {getWatchlistHTML} from '../page-templates/watchlist.js'
import EmptyWatchlistMessage from '../components/EmptyWatchlistMessage.js'
import renderSelectedFilm from '../utils/renderSelectedFilm.js'
import store from '../store.js'
import hideElement from '../utils/hideElement.js'
import {animateIn, animateSavedFilm} from '../animations/watchlist.js'
import {hideLoader} from '../utils/hideLoader.js'
 
export default function Watchlist() {
    const watchlist = store.getState()
    
    reenableResultsPageAnimation()
    view.innerHTML = getWatchlistHTML()
    hideLoader()
    if(watchlist.length > 0) {
        animateIn()
        handleClickEvents()
        filterFilmsInWatchlist()
        hideElement()
        renderSelectedFilm()
    }
}

function handleClickEvents() {
    const films = document.querySelector('.films')
    films.addEventListener('click', e=> {
        
        const isOptionsClicked = e.target.dataset.optionsBtn
        const isRemovedClicked = e.target.dataset.removeFilm
        const isChangeWatchStatusClicked = e.target.dataset.changeWatchStatus

        if(isOptionsClicked) {
            toggleFilmOptionsDisplay(e.target.dataset.optionsBtn)
        } else if(isRemovedClicked) {
            removeFilmFromWatchlist(e.target.dataset.removeFilm)
        } else if(isChangeWatchStatusClicked) {
            changeFilmWatchStatus(e.target.dataset.changeWatchStatus)
        }
        renderEmptyWatchlistMessage(films)
    })
}

function toggleFilmOptionsDisplay(id) {
    const optionsCntr = document.getElementById(`saved-film-options-cntr-${id}`)
    if(optionsCntr.classList.contains(`invisible`)) {
        optionsCntr.classList.remove('invisible')
    } else {
        optionsCntr.classList.add('invisible')
    }
}

function removeFilmFromWatchlist(id) {
    const watchlist = store.getState()
    const filmToRemove = watchlist.find(film=> film.id === Number(id))
    const savedFilmEl = document.getElementById(`saved-film-${id}`)

    savedFilmEl.remove()
    store.dispatch({type: 'REMOVE', payload: {film:filmToRemove} } )
    localStorage.setItem('watchlist-ria', JSON.stringify(store.getState()))
}

function changeFilmWatchStatus(id) {    
    const watchlist = store.getState()
    const watchedCheckIconEl = document.getElementById(`watched-check-icon-${id}`)
    const watchStatusLabelEL = document.getElementById(`watch-status-label-${id}`)
    const savedFilmEl = document.getElementById(`saved-film-${id}`)
    const watchStatusCheckboxEl = document.getElementById(`watch-status-checkbox-${id}`)

    watchStatusLabelEL.classList.toggle('hover:text-amber-500')
    watchStatusLabelEL.classList.toggle('hover:text-green-700')
    if(watchStatusCheckboxEl.checked) {
        filmNotWatched(id, savedFilmEl, watchStatusLabelEL, watchedCheckIconEl)
    } else {
        filmWatched(id, savedFilmEl, watchStatusLabelEL, watchedCheckIconEl)
    }
    localStorage.setItem('watchlist-ria', JSON.stringify(watchlist))
}

function filmWatched(id, savedFilmEl, watchStatusLabelEL, watchedCheckIconEl) {
    store.dispatch({type: 'WATCHED', payload: {id: Number(id)} })
    savedFilmEl.classList.add('watched')
    savedFilmEl.classList.remove('not-watched')
    watchStatusLabelEL.innerHTML = `Not watched <i class="fa-regular fa-circle-xmark text-xs lg:text-sm text-amber-500"></i>`
    watchedCheckIconEl.style.visibility = 'visible'
}

function filmNotWatched(id, savedFilmEl, watchStatusLabelEL, watchedCheckIconEl) {
    store.dispatch({type: 'NOT_WATCHED', payload: {id: Number(id)} } )
    savedFilmEl.classList.add('not-watched')
    savedFilmEl.classList.remove('watched')
    watchStatusLabelEL.innerHTML = `Watched <i class="fa-regular fa-circle-check text-xs lg:text-sm text-green-700"></i>`
    watchedCheckIconEl.style.visibility = 'hidden'
}

function renderEmptyWatchlistMessage(films) {
    const watchlist = store.getState()
    if(!watchlist.length > 0) {
        const filtersEl = document.getElementById('filters')
        filtersEl.classList.add('hidden')
        films.innerHTML = EmptyWatchlistMessage()
    }
}

function filterFilmsInWatchlist() {
    const showAllBtn = document.getElementById('all-btn')
    const showWatchedFilmsBtn = document.getElementById('watched-btn')
    const savedFilmsWrapper = document.getElementById('films-wrapper')

    savedFilmsWrapper.addEventListener('change', e=> {
        const isWatchedStatuschanged = e.target.classList.contains('watch-status')
        
        if(showAllBtn.checked) {
            showAllFilms()
        } else if(showWatchedFilmsBtn.checked) {
            showAllFilms()
            hideFilms('not-watched')
        } else {
            showAllFilms()
            hideFilms('watched')
        }
        if(isWatchedStatuschanged) return
        animateSavedFilm()
    })
}

function showAllFilms() {
    const allFilmsInWatchlist = document.querySelectorAll('.saved-film')
    allFilmsInWatchlist.forEach(film=> {
        film.style.display = 'block'
    })
}

function hideFilms(className) {
    const filmsToHide = document.querySelectorAll(`.${className}`)
    filmsToHide.forEach(film=> {
        film.style.display = 'none'
    })
}