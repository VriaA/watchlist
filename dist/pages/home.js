import { reenableResultsPageAnimation } from '../animations/results.js'
import getHomeHTML from '../page-templates/home.js'
import search from '../utils/search.js'
import view from "../utils/view.js"

function Home() {
    reenableResultsPageAnimation()
    view.innerHTML = getHomeHTML()
    search()
}

export {Home}