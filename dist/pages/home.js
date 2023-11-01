import { reenableResultsPageAnimation } from '../animations/results.js'
import getHomeHTML from '../page-templates/home.js'
import getSearchResults from "../utils/getSearchResults.js"
import view from "../utils/view.js"

function Home() {
    reenableResultsPageAnimation()
    view.innerHTML = getHomeHTML()
    search()
}

function search() {
    const searchBar = document.getElementById('search-bar')
    searchBar.addEventListener("submit", async e=> {
        e.preventDefault()
        await getSearchResults()
        window.location.href = '#/results'
    })
}
export {Home, search}