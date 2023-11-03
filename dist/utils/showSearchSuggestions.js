import { options } from './getSearchResults.js'
import Suggestion from '../components/Suggestion.js'

export default function showSearchSuggestions() {
    const searchInput = document.getElementById('search-input')
    const suggestionsEL = document.getElementById('suggestions')
    searchInput.addEventListener('input', async _=>{
        const filmTitle = searchInput.value
        if(!filmTitle) return

            const suggestions = await getSuggestions(filmTitle)
            if(suggestions.length > 0) {
                suggestionsEL.classList.remove('invisible')
                suggestionsEL.innerHTML = Suggestion(suggestions)
            }else {
                suggestionsEL.classList.add('invisible')
            }
    })
}

async function getSuggestions(filmTitle) {
    filmTitle = filmTitle.trim().replace(/&/g, '%26')

    const response = await fetch(`https://api.themoviedb.org/3/search/multi?query=${filmTitle}&include_adult=false&language=en-US&page=1`, options)
    const data = await response.json()
    const searchResults = data.results.filter(result=> result.media_type != 'person').splice(0,3)
    return searchResults
}