//DOM ELEMENTS ASSIGNED TO VARIABLES
const searchBar = document.getElementById('search-bar')
const searchInputEl = document.getElementById('search-input')
const yearInputEl = document.getElementById('year')

//RESULTS SAVED IN LOCALSTORAGE ASSIGNED TO A VARIABLE
//USED TO RENDER RESULTS IN THE RESULTS PAGE WHEN REDIRECTED
const savedResults = JSON.parse(localStorage.getItem('results'))

//CHECKS IF THERE ARE ANY RESULTS SAVED IN LOCAL STORAGE AND CLEARS THEM ON PAGE LOAD BEFORE ANY SEARCH
if(savedResults) {
    localStorage.removeItem('results')
}

//GETS RESULTS FROM THE OMDB USING THE OMDB API THEN REDIRECTS THE BROWSER TO THE RESULTS PAGE
searchBar.addEventListener("submit", async e=> {
    e.preventDefault()
    await getSearchResults() 
    window.location.href= `/dist/results.html`
})

/*FETCHES DATA FROM THE OMDB USING THE OMDB API BY PASSING IN THE FOLLOWING QUERIES;
A UNIQUE API KEY GOTTEN FROM THE OMDB API WEBSITE, THE MOVIE TITLE AND THE YEAR GOTTEN FROM THE DOM*/
//SAVES THE SEARCH RESULTS TO LOCAL STORAGE
async function getSearchResults() {
    const title = searchInputEl.value
    const movieTitle = title.trim()
    let movieYear
    yearInputEl.value ? movieYear = yearInputEl.value : movieYear

    const response = await fetch(`https://www.omdbapi.com/?apikey=3ebce484&s=${movieTitle}&y=${movieYear}`)
    const data = await response.json()
    const searchResults = data.Search

    if(searchResults) {
        localStorage.setItem('results', JSON.stringify(searchResults))
    }
}