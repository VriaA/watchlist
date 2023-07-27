const loaderCntr = document.getElementById('loader')

window.addEventListener("load", _=> {
    setTimeout(_=> {
        loaderCntr.style.transition = ".5s opacity ease"
        loaderCntr.style.opacity = 0
        setTimeout(_=> {
            loaderCntr.classList.add('hidden')
        }, 1500)
    }, 1000)
})