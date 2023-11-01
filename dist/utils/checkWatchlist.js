import store from "../store.js";

export default function checkWatchlist(filmToCheckFor) {
    const watchlist = store.getState()
    if(watchlist.length > 0){
        return watchlist.some(film=> filmToCheckFor.id === film.id)
    }
}