//IMPORTS THE GET SELECTION FUNCTION FROM MOVIE.JS TO GET THE DATA OF A FILM WHEN THE POSTER IS CLICKED
import { renderSelection } from './movie.js'

//DOM ELEMENTS ASSIGNED TO VARIABLES
const searchBar = document.getElementById('search-bar')
const searchInputEl = document.getElementById('search-input')
const yearInputEl = document.getElementById('year')
const main = document.getElementById('main')

//RESULTS SAVED TO LOCALSTORAGE IN THE HOMEPAGE ASSIGNED TO A VARIABLE TO BE USED TO RENDER RESULTS
const searchResults = JSON.parse(localStorage.getItem('results'))
let resultsFound 

//RENDERS LOCAL STORAGE RESULTS ON LOAD
renderResults(searchResults)

//CALLS FUNCTIONS FOR SCROLLING AND RENDERING FILM DATA AFTER CLICKING A POSTER IF RESULTS ARE FOUND. 
if(resultsFound) {
    scrollToStart()
    scroll() 
    renderSelection()
}

//ASSIGNS RESULTS HTML TO THE MAIN CONTAINER'S INNER HTML
function renderResults(results) {
    main.innerHTML = getResultsHtml(results)
}


//IF RESULTS ARE FOUND, IT FLIPS THE resultsFound BOOLEAN TO TRUE AND PASSES THEIR POSTERS TO AN HTML BOILER PLATE TO BE RETURNED.
//IF NOT, RETURNS AN HTML BOILER PLATE CONTAINING AN ERROR MESSAGE
function getResultsHtml(results) {
    if(results) {
        resultsFound = true
        return  `<div id="back-btn" class="cursor-pointer">
                    <span class="material-symbols-outlined 
                                text-5xl md:text-7xl font-medium">
                        keyboard_arrow_left
                    </span>
                </div>

                    <div id="gallery" class="gallery flex overflow-x-scroll min-w-[250px]
                                            max-w-[250px] md:min-w-[248px] md:max-w-[67%]
                                            h-4/5 rounded-md scrollbar-none">
                        <div id="results-cntr" class="w-full h-full flex items-center gap-5 pb-5">
                            ${getPostersHtml(results)}
                        </div>
                    </div>

                <div id="next-btn" class="cursor-pointer">
                    <span class="material-symbols-outlined 
                                text-5xl md:text-7xl font-medium">
                        keyboard_arrow_right
                    </span>
                </div>`
    } else {
        return `<div class="absolute inset-0 w-2/3 h-fit m-auto flex flex-col items-center text-center gap-2">
                    <p class="text-base font-semibold">Unable to find what you&apos;re looking for.</p>
                    <span class="material-symbols-outlined text-5xl font-medium">
                        error
                        </span>
                </div>`
    }
}

//PASSES POSTER DATA TO AN HTML BOILER PLATE
//IF NO RESULTS ARE FOUND, A PLACEHOLDER WITH THE FILM NAME IS RETURNED
//IF RESULTS ARE FOUND, THE FILM POSTER IS RETURNED
function getPostersHtml(results) {
    return  results.map(result=> {
            if(result.Poster === 'N/A') {
                return `<span class="w-[250px] h-[350px] flex-none flex items-center justify-center
                                    bg-stone-800/30 rounded-md overflow-hidden transition-all 
                                    cursor-pointer hover:scale-105 hover:translate-y-2 text-center snap-start"
                                    data-result="${result.imdbID}">
                            <p class="uppercase font-inter tracking-wide" data-result="${result.imdbID}">${result.Title}</p>
                        </span>`
            } else {
                return  `<span class="w-[250px] max-h-[400px] flex-none overflow-hidden transition-all 
                            cursor-pointer hover:scale-105 hover:translate-y-2 rounded-md snap-start">
                                <img class="w-full object-cover object-center" src="${result.Poster}" alt="${result.Title}" 
                                data-result="${result.imdbID}">
                        </span>`
            }
                
    }).join('')
}

//CHECKS IF THERE ARE RESULTS IN LOCALSTORAGE, DELETES THEM IF TRUE.
//CALLS THE FUNCTION FOR FECTHING DATA FROM THE OMDB
//CALLS THE FUNCTION FOR RENDERING THE RESULTS
//CALLS FUNCTIONS FOR SCROLLING AND RENDERING FILM DATA AFTER CLICKING A POSTER IF RESULTS ARE FOUND.  
searchBar.addEventListener('submit', async e=> {
    e.preventDefault()
    const localStorageResults = JSON.parse(localStorage.getItem('results'))
    if(localStorageResults) {
        localStorage.removeItem('results')
    }

    await getSearchResults()

    const savedSearchResults = JSON.parse(localStorage.getItem('results'))
    renderResults(savedSearchResults)
    scrollToStart()
    scroll() 
    renderSelection()
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

//SCROLLS THE GALLERY CONTAINER RIGHT WHEN THE BACK BUTTON IS CLICKED
//SCROLLS THE GALLERY CONTAINER LEFT WHEN THE NEXT BUTTON IS CLICKED
function scroll() {
    const gallery = document.getElementById('gallery')
    if(gallery) {
        const backBtn = document.getElementById('back-btn')
        const nextBtn = document.getElementById('next-btn')
        backBtn.addEventListener('click', e=> {
            const galleryWidth = gallery.offsetWidth
            gallery.scrollLeft -= galleryWidth
        })
        
        nextBtn.addEventListener('click', e=> {
            const galleryWidth = gallery.offsetWidth
            gallery.scrollLeft += galleryWidth
        })
    }
}

//SCROLLS THE GALLERY CONTAINER TO THE EXTREME LEFT/STARTING POSITION WHEN RESULTS ARE RENDERED
//ENABLES SCROLL SNAP FOR ALL POSTERS AFTER .4 SECONDS
function scrollToStart() {
    const gallery = document.getElementById('gallery');
    if(gallery) { gallery.scrollTo({ left: 0, behavior: 'smooth' }, 0); }
    if(gallery && gallery.children) { setTimeout(_=> gallery.classList.add(`snap-x`, `snap-mandatory`), 400) }
}