import getFilmDetails from "../utils/getFilmDetails.js"
import getFilmHTML from "../page-templates/film.js"
import scrollCards from "../utils/scrollCards.js"
import imageBaseUrl from "../utils/imageBaseUrl.js"
import manageScrollButtons from "../utils/manageScrollButtons.js"
import renderSelectedFilm from "../utils/renderSelectedFilm.js"
import search from '../utils/search.js'
import store from "../store.js"
import view from "../utils/view.js"
import checkWatchlist from "../utils/checkWatchlist.js"
import showSearchSuggestions from "../utils/showSearchSuggestions.js"
import hideElement from "../utils/hideElement.js"
import { animateFilmIn, animateFIlmGalleries} from "../animations/film.js"
import {hideLoader, showLoader} from '../utils/loader.js'

const savedFilm = JSON.parse(sessionStorage.getItem('selectedFilm'))

export default async function Film() {
        showLoader()
        const {type, id} = savedFilm
        const filmDetails = await getFilmDetails(type, id)
        view.innerHTML = getFilmHTML(filmDetails, type)
        changeBackdrop(filmDetails)
        setFilmCta(filmDetails)
        handleClickEvents()
        scrollCards()
        animateFilmIn()
        animateFIlmGalleries()
        showSearchSuggestions()
        hideElement()
        search()
        manageScrollButtons()
        renderSelectedFilm()
        manageWatchlist(filmDetails)
        hideLoader()
}

function changeBackdrop(filmDetails) {
    const {backdrop_path} = filmDetails
    const filmCntr = document.getElementById('film-cntr')
    const filmEl = document.getElementById('film')

    if(!backdrop_path) {
        filmCntr.style.backgroundImage = `url(../images/film.webp)`
        filmEl.style.backgroundImage = `url(../images/film.webp)`
        filmCntr.style.backgroundColor = `#450a0a`
        filmEl.style.backgroundColor = `#991b1b`
    } else {
        const backdrop = imageBaseUrl + backdrop_path
        filmCntr.style.backgroundImage = `url(${backdrop})`
        filmEl.style.backgroundImage = `url(${backdrop})`
    }  
}

function handleClickEvents() {
    const filmCntr = document.getElementById('film-cntr')
    filmCntr.addEventListener('click', e=> {
        if(e.target.id === 'search-icon') {
            toggleSearchBarVisibility()
        } else if(e.target.dataset.clamp) {
            toggleLineClamp(e.target.dataset.clamp)
        }
    })
}

function toggleSearchBarVisibility() {
    const isPC = window.innerWidth >= 1024
    const searchFieldsetEl = document.getElementById('search-fieldset')
        searchFieldsetEl.classList.toggle('hidden')
        if(isPC) {
            searchFieldsetEl.style.width = '500px'
        } else {
            searchFieldsetEl.style.width = '250px'
        }
}

function toggleLineClamp(id) {
    const clampabble = document.getElementById(`clampable-${id}`)
        clampabble.classList.toggle('line-clamp-3')
        clampabble.classList.toggle('overflow-y-auto')
        clampabble.scrollTo(0,0)
}

function setFilmCta(film) {
    const filmCtaIconEl = document.getElementById('film-cta-icon')
    const filmCtaTextEl = document.getElementById('film-cta-text')
        const isInWatchlist = checkWatchlist(film)
        const iconInnerText = isInWatchlist ? 'playlist_add_check' : 'playlist_add'
        const ctaText = isInWatchlist ? 'Remove from watchlist' : 'Add to watchlist'
        filmCtaIconEl.innerText = iconInnerText
        filmCtaTextEl.innerText = ctaText
}

function manageWatchlist() {
    const filmCtaIconCntrEl = document.getElementById('film-cta-btn')
    filmCtaIconCntrEl.addEventListener('click', e=> {
        const film = JSON.parse(e.target.dataset.film)
        const isInWatchlist = checkWatchlist(film)
        if(!isInWatchlist) {
            updateWatchlist('ADD', film)
        } else {
            updateWatchlist('REMOVE', film)
        }
        setFilmCta(film)
    })
}

function updateWatchlist(actionType, filmToAdd) {
    store.dispatch({type: actionType, payload: {film: filmToAdd} })
    localStorage.setItem('watchlist-ria', JSON.stringify(store.getState()))
}