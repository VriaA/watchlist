//DOM ELEMENT ASSIGNED TO A VARIABLE
const selectedFilmCntr = document.getElementById('selected-film-cntr')

//ASSIGNS WATCHLIST IN LOCAL STORAGE TO A VARIABLE
const savedWatchlist = JSON.parse(localStorage.getItem('watchlist'))

//DECLARES AN EMPTY WATCHLIST ARRAY
let watchlist = []

//IF THERE IS A WATCHLIST IN LOCAL STORAGE, IT WILL BE ASSIGNED TO THE EMPTY WATCHLIST ARRAY
if(savedWatchlist) {
    watchlist = savedWatchlist
}

//RENDERS INFO OF A FILM WHEN THE POSTER IS CLICKED IN THE RESULTS PAGE
export function renderSelection() {
    const resultsCntr = document.getElementById('results-cntr')
    if(resultsCntr) {
        resultsCntr.addEventListener('click', async e=> {
            const movieId = e.target.dataset.result
            await getSelectionDetails(movieId)
        })
    }
}

//FETCHES DATA ABOUT THE FILM SELECTED WHEN THE POSTER IS CLICKED USING THE IMDBID OF THE FILM
async function getSelectionDetails(id) {
    const response = await fetch(`https://www.omdbapi.com/?apikey=3ebce484&i=${id}`)
    const data = await response.json()
    getSelectionHtml(data)
}

//PASSES THE DATA OF THE SELECTED FILM TO AN HTML BOILER PLATE
//ASSIGNS THE HTML TO THE SELECTED FILM CONTAINER
//CALLS FUNCTIONS FOR CLOSING THE SELECTED FILM CONTAINER AND MANAGING THE WATCHLIST
function getSelectionHtml(returnedData) {
    selectedFilmCntr.innerHTML = `<section class="relative flex flex-col md:flex-row gap-5 justify-center w-full md:w-[90%] lg:w-[60%] 
                                               md:min-h-[80%] text-sm px-2 py-10 bg-stone-900 rounded-md pl-5 pr-10 shadow-zinc-700
                                               shadow-md items-center text-center md:text-left">
                                <span id="close-selection" class="material-symbols-outlined
                                                                  absolute top-2 right-2 px-1 text-3xl
                                                                  cursor-pointer hover:text-red-700" 
                                                                  title="Close">
                                close
                                </span>

                                <div class="w-[100px] md:w-[300px] max-h-[450px] flex-none rounded-md overflow-hidden">
                                    ${getPoster(returnedData)}
                                </div>             

                                <div class="flex flex-col justify-center gap-5">
                                <div class="flex items-baseline justify-between gap-3">
                                    <h2 id="move-title" class="text-xl md:text-4xl leading-none capitalize">${returnedData.Title} (${returnedData.Year})</h2>

                                    <p class="flex items-end gap-1 text-sm md:text-base">
                                        <span class="flex items-center material-symbols-outlined text-xl h-6 font-semibold text-amber-300" style="font-variation-settings:
                                        'FILL' 1">
                                            star
                                        </span>
                                        <span id="rating" class="font-light">${returnedData.imdbRating}</span>
                                    </p>
                                </div>

                                <div class="text-sm md:base flex gap-3 items-center justify-center md:justify-start">
                                <p id="duration">${returnedData.Runtime}</p>
                                <p id="genre">${returnedData.Genre}</p>
                                <span id="watchlist-icon" class="material-symbols-outlined flex items-center text-slate-50
                                                    hover:text-slate-100 justify-center w-7 h-7 text-3xl 
                                                    cursor-pointer rounded-md 
                                                    transition-transform active:translate-y-1 md:p-3
                                                    hover:bg-red-700" title="Add to watchlist">
                                ${setWatchlistIcon(returnedData)}</span>
                                </div>

                                <p class="text-base md:text-lg">${returnedData.Plot}</p>
                                <p class="text-sm md:text-base text-left"><strong>Stars:</strong> ${returnedData.Actors}.</p>
                                <p class="text-sm md:text-base text-left capitalize"><strong>Type:</strong> ${returnedData.Type}</p>
                                </section>`
        selectedFilmCntr.classList.remove('invisible')
        selectedFilmCntr.classList.add('visible')
        closeSelection()
        manageWatchlist(returnedData)
}

//CHECKS IF THERE IS A URL FOR THE POSTER OF THE SELECTED FILM
//IF NOT, RETURNS HTML FOR A PLACEHOLDER WITH THE POSTER NAME
//IF THERE IS A URL, RETURNS HTML FOR THE POSTER IMAGE
function getPoster(dataReturned)  {
    if(dataReturned.Poster === "N/A") {
    return    `<div class="h-[110px] md:h-[450px] w-full flex items-center justify-center text-xs md:text-base font-inter uppercase bg-red-800/20">No Poster</div>`
    } else {
    return    `<img class="h-full w-full object-cover object-center" src="${dataReturned.Poster}" alt="${dataReturned.Title}">`
    }
}

//CLOSES THE SELECTED FILM CONTAINER WHEN CLICKED
function closeSelection() {
    const closeIcon = document.getElementById('close-selection')
    closeIcon.addEventListener('click', _=> {
        selectedFilmCntr.classList.remove('visible')
        selectedFilmCntr.classList.add('invisible')
    })
}

/*CHECKS IF A FILM IS IN WATCHLIST WHEN IT IS CLICKED AND SETS THE APPROPRIATE
 ICON FOR BOTH CONDITIONS BY CHANGING THE INNER TEXT OF THE ICON CONTAINER*/
function setWatchlistIcon(toAdd) {
    if(watchlist.length > 0) {
        const isInWatchlist = watchlist.some(obj=> JSON.stringify(toAdd.imdbID) === JSON.stringify(obj.imdbID))
        const iconInnerText = isInWatchlist ? 'playlist_add_check' : 'playlist_add'
        return iconInnerText
    }
    return 'playlist_add'
}

/*WHEN THE WATCHLIST ICON IS CLICKED, THE SELECTED FILM IS,
ADDED IF IT IS NOT IN THE WATCHLIST, REMOVED IF IT IS ALREADY IN THE WATCHCLIST*/
function manageWatchlist(selected) {
    const watchlistIcon = document.getElementById('watchlist-icon')
    watchlistIcon.addEventListener('click', _=> {
        const toBeAdded = createListItemObj(selected)

        const isInWatchlist = watchlist.some(obj=> JSON.stringify(toBeAdded) === JSON.stringify(obj))
        if(!isInWatchlist) {
            addToWatchlist(toBeAdded, watchlistIcon)
        } else {
            removeFromWatchlist(toBeAdded, watchlistIcon)
        }
    })
}

//CREATES AN OBJECT FOR CHOSEN FILM THAT WILL BE ADDED TO WATCHLIST
function createListItemObj(chosen) {
    return  {
            poster: chosen.Poster,
            title: chosen.Title,
            year: chosen.Year,
            imdbRating: chosen.imdbRating,
            runtime: chosen.Runtime,
            genre: chosen.Genre,
            plot: chosen.Plot,
            imdbID: chosen.imdbID
        }
}

//PUSHES THE OBJECT OF THE SELECTED FILM TO WATCHLIST AND SAVES THE WATCHLIST ARRAY TO LOCAL STORAGE
function addToWatchlist(added, listIcon) {
    watchlist.push(added)
    localStorage.setItem('watchlist', JSON.stringify(watchlist))
    listIcon.innerText = 'playlist_add_check'
}

//LOOKS FOR THE INDEX OF THE SELECTED FILM IN THE WATCH LIST ARRAY
//UTILIZES THE INDEX OF THE SELECTED FILM TO REMOVE IT FROM THE WATCHLIST ARRAY USING THE SPLICE METHOD
//SAVES THE WATCHLIST ARRAY TO LOCAL STORAGE
function removeFromWatchlist(removed, icon) {
    const tobeRemovedindex = watchlist.findIndex(listItem=> JSON.stringify(listItem) === JSON.stringify(removed))
    watchlist.splice(tobeRemovedindex, 1)
    localStorage.setItem('watchlist', JSON.stringify(watchlist))
    icon.innerText = 'playlist_add'
}