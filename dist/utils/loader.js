function hideLoader() {
    const loaderCntr = document.getElementById('loader')
        setTimeout(_=> {
            loaderCntr.style.transition = ".5s opacity ease"
            loaderCntr.style.opacity = 0
                loaderCntr.classList.remove('flex')
                loaderCntr.classList.add('hidden')
        }, 2000)
}

function showLoader() {
    const loaderCntr = document.getElementById('loader')
    loaderCntr.classList.add('flex')
    loaderCntr.classList.remove('hidden')
    loaderCntr.style.opacity = 1
}
export {hideLoader, showLoader}