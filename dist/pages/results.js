import getResultsHtml from '../page-templates/results.js'
import getSearchResults from '../utils/getSearchResults.js'
import scrollCards from "../utils/scrollCards.js";
import ResultsPlaceholders from '../components/resultsPlaceholders.js';
import manageScrollButtons from '../utils/manageScrollButtons.js';
import renderSelectedFilm from '../utils/renderSelectedFilm.js';
import view from "../utils/view.js"
import showSearchSuggestions from '../utils/showSearchSuggestions.js';
import hideElement from '../utils/hideElement.js';
import { animateIn } from '../animations/results.js';


export default function Results() {

    const isVisited = JSON.parse(sessionStorage.getItem('results-page-visited')) || false 
    const searchResults = JSON.parse(sessionStorage.getItem('results'))
    const resultsFound = Boolean(searchResults)

    view.innerHTML = getResultsHtml(searchResults)
 
    if(resultsFound) {
        if(!isVisited) {
             animateIn()
             sessionStorage.setItem('results-page-visited', JSON.stringify(true))
        }
        scrollCards() 
        renderSelectedFilm()
        manageScrollButtons()
        showSearchSuggestions()
        hideElement()
    }
    search()
}

export function search() {
    const searchBar = document.getElementById('search-bar')
    const resultsCntr = document.getElementById('results-cntr')
    searchBar.addEventListener('submit', async e=> {
        e.preventDefault()
        if(resultsCntr) {
            resultsCntr.innerHTML = ResultsPlaceholders()
        }
        await getSearchResults()
    
        const savedSearchResults = JSON.parse(sessionStorage.getItem('results'))
       Results(savedSearchResults)
    })
}