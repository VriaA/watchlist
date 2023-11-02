function hideLoader() {
    const loaderCntr = document.getElementById('loader')
        setTimeout(_=> {
            loaderCntr.style.transition = ".5s opacity ease"
            loaderCntr.style.opacity = 0
            setTimeout(_=> {
                loaderCntr.classList.remove('flex')
                loaderCntr.classList.add('hidden')
            }, 2500)
        }, 2000)
}

function showLoader() {
    const loaderCntr = document.getElementById('loader')
    loaderCntr.classList.remove('hidden')
    loaderCntr.classList.add('flex')
    loaderCntr.style.opacity = 1
}

export {hideLoader, showLoader}