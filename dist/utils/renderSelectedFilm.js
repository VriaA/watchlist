
export default function renderSelectedFilm() {
    const filmsCntrs = document.querySelectorAll('.films')
    if(!filmsCntrs) return

    filmsCntrs.forEach(film=>{
        film.addEventListener('click', async e=> {
            const filmType = e.target.dataset.type
            if(!filmType) return
            const filmId = e.target.dataset.id
            const filmToSave = new Film(filmId, filmType)
           
            sessionStorage.setItem('selectedFilm', JSON.stringify(filmToSave))
            // showLoader()
            window.location.href = `#/film`
            location.reload()
       })
    })
}

class Film {
    constructor(id, type) {
        this.id = id
        this.type = type
    }
}