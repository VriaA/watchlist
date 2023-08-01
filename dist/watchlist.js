//DOM ELEMENTS ASSIGNED TO VARIABLES
const watchlistEl = document.getElementById('watchlist')
const backToTheTop = document.getElementById('back-to-the-top')

//ASSIGNS WATCHLIST IN LOCAL STORAGE TO A VARIABLE
const savedWatchlist = JSON.parse(localStorage.getItem('watchlist'))

//DECLARES AN EMPTY WATCHLIST ARRAY
let watchlist = []

//IF THERE IS A WATCHLIST IN LOCAL STORAGE, IT WILL BE ASSIGNED TO THE EMPTY WATCHLIST ARRAY
if(savedWatchlist) {
    watchlist = savedWatchlist
}

//RENDERS FILMS IN WATCH LIST ON PAGE LOAD
renderListItems()

//IF WATCHLIST IS EMPTY, RENDERS A MESSAGE
//IF NOT, RENDERS FILMS IN THE WATCHLIST WHEN CALLED 
//MAKES THE BACK TO THE TOP BUTTON VISIBLE 
function renderListItems() {
    if(watchlist && watchlist.length > 0) {
        watchlistEl.innerHTML = getWatchListHtml()
        backToTheTop.classList.remove('invisible')
        backToTheTop.classList.add('visible')
    } else {
        watchlistEl.innerHTML = getEmptyWatchlistMessageHtml()
    }
}

//DELETES A FILM FROM WATCH LIST WHEN THE REMOVE ICON IS CLICKED (THE REMOVED ICON IS CLICKED USING THE IMDB ID SAVED IN THE DATA ATTRIBUTE)
//UNCLAMPS PLOT TEXT WHEN A FILM'S PLOT IS CLICKED (THE PLOT IS IDENTIFIED USING AN ID THAT ENDS WITH THE FILM'S IMDB ID)
watchlistEl.addEventListener('click', e=> {
    if(e.target.dataset.listItem) {
        const listItemId = e.target.dataset.listItem
        deleteListItem(listItemId)
        renderListItems()
    }
    if(e.target.dataset.plot) {
        const plotCntr = document.getElementById(`plot-${e.target.dataset.plot}`)
        plotCntr.classList.toggle('line-clamp-3')
    }
})

//FINDS THE INDEX OF A FILM IN WATCHLIST WHEN IT'S REMOVE ICON IS CLICKED
//UTILIZES THE INDEX TO REMOVE THE FILM FROM WATCHLIST USING THE SPLICE METHOD
//CALLS THE FUNCTION THAT UPDATES THE WATCHLIST IN LOCAL STORAGE
function deleteListItem(itemId) {
    const itemInWatchList = watchlist.find(item=> item.imdbID === itemId)
    const indexOfItemInWatchlist = watchlist.indexOf(itemInWatchList)
    watchlist.splice(indexOfItemInWatchlist, 1)
    updateWatchlistInLocalStorage()
}

//DELETES THE WATCHLIST IN LOCAL STORAGE IF THE WATCH LIST IS EMPTY
//IF NOT, IT SAVES THE WATCHLIST TO LOCAL STORAGE
function updateWatchlistInLocalStorage() {
    if(watchlist.length > 0) {
        localStorage.setItem('watchlist', JSON.stringify(watchlist))
    } else {
        localStorage.removeItem('watchlist')
    }
}

//GETS THE HTML BOILER PLATE CONTAINING DATA FOR ALL WATCHLIST ITEMS
function getWatchListHtml() {
        return watchlist.map(listItem=> {
            return `<section class="self-start max-w-lg text-sm p-2 grid grid-cols-four justify-start items-center gap-y-2 bg-stone-800 rounded-md">
                        <img class="col-start-1 col-end-2 row-start-1 row-end-4 object-cover" src="${listItem.poster}" alt="${listItem.title}">

                        <div class="flex justify-between gap-2 col-start-3 col-end-6 row-start-1 row-end-2">
                            <div class="flex items-baseline gap-3">
                                <h2 id="move-title" class="text-lg leading-none capitalize">${listItem.title} (${listItem.year})</h2>
                        
                                <p class="flex items-end gap-1 text-xs md:text-sm">
                                    <span class="material-symbols-outlined text-sm md:text-base h-fit font-semibold text-amber-300" 
                                    style="font-variation-settings: 'FILL' 1">
                                        star
                                    </span>
                                    <span id="rating" class="font-extralight">${listItem.imdbRating}</span>
                                </p>
                            </div>

                            <span class="material-symbols-outlined flex items-center text-slate-950
                                        hover:text-slate-100 justify-center w-5 h-5 text-lg 
                                        md:text-xl bg-slate-100 cursor-pointer rounded-full 
                                        transition-transform active:translate-y-1 md:p-3
                                        hover:bg-red-700" data-list-item="${listItem.imdbID}"
                                        title="Remove from watchlist">
                            remove</span>
                        </div>

                        <div class="col-start-3 col-end-6 row-start-2 row-end-3
                                    text-xs flex gap-5">
                            <p>${listItem.runtime}</p>
                            <p>${listItem.genre}</p>
                        </div>

                        <p id="plot-${listItem.imdbID}" class="overflow-hidden line-clamp-3 col-start-3 col-end-6 row-start-3 row-end-4 text-sm" data-plot="${listItem.imdbID}">
                        ${listItem.plot}
                        </p>
                    </section>`
    }).join('')
}

//GETS THE HTML BOILER PLATE FOR A MESSAGE THAT IS RENDERED WHEN THE WATCHLIST IS EMPTY
function getEmptyWatchlistMessageHtml() {
    return `<div class="absolute w-fit h-fit inset-0 m-auto flex flex-col items-center gap-2">
                <p class=" text-base font-semibold">Nothing to see here...</p>
                <span class="material-symbols-outlined text-5xl font-medium">
                    sentiment_dissatisfied
                </span>
            </div>`
}