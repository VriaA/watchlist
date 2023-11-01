const loaderCntr = document.getElementById('loader')

function hideLoader() {
    window.onload = ()=> {
        setTimeout(_=> {
            loaderCntr.style.transition = ".5s opacity ease"
            loaderCntr.style.opacity = 0
            setTimeout(_=> {
                loaderCntr.classList.add('invisible')
            }, 1500)
        }, 1000)
    }
}

function showLoader() {
    loaderCntr.classList.remove('invisible')
    loaderCntr.style.opacity = 1
}

export {hideLoader, showLoader}