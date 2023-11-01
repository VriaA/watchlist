import { Home } from "./pages/home.js"
import Results from "./pages/results.js"
import Film from "./pages/film.js"
import Watchlist from './pages/watchlist.js'
const router = new Navigo(null, true, '#')

export default class routerHandler {
    constructor() {
        this.createRoutes()
    }

    createRoutes() {
        const routes = [
            {path: '/', page: Home},
            {path: '/results', page: Results},
            {path: '/film', page: Film},
            {path: '/watchlist', page: Watchlist}
        ]
        routes.forEach( ({path, page})=> {
            router.on(path, ()=> {
                page(path)
            }).resolve()
        })
    }
}