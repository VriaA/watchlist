import getSearchResults from "./getSearchResults.js"

export default function search() {
    const searchBar = document.getElementById('search-bar')
    searchBar.addEventListener("submit", async e=> {
        e.preventDefault()
        await getSearchResults()
        window.location.href = '#/results'
    })
}