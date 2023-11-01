
function createStore(reducer) {
    const savedWatchlist = JSON.parse(localStorage.getItem('watchlist-ria'))
    let currentState = savedWatchlist || reducer(undefined, {})

    return {
        getState: ()=> currentState,
        dispatch: action=> currentState = reducer(currentState, action)
    }
}

const initialState = []

function watchlistReducer(state = initialState, action) {
    switch(action.type) {
        case 'REMOVE': {
            const watchlist = state
            const filmToRemove = action.payload.film
            return watchlist.filter(film=> film.id != filmToRemove.id )
        }case 'ADD': {
            const watchlist  = state
            const filmToAdd = action.payload.film
            return [...watchlist, {...filmToAdd, watched: false}]
        } case 'WATCHED': {
            let watchlist = state
            const watchedFilmId = action.payload.id
            watchlist.forEach(film=> {
                if(film.id === watchedFilmId) {
                    film.watched = true
                }
            })
            return watchlist
        } case 'NOT_WATCHED': {
            const watchlist = state
            const filmToWatchId = action.payload.id
            watchlist.forEach(film=> {
                if(film.id === filmToWatchId) {
                    film.watched = false
                }
            })
            return watchlist
        }default: {
            return state
        }
    }
}

const store = createStore(watchlistReducer)
export default store