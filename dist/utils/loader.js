function hideLoader() {
    const loaderCntr = document.getElementById('loader')
        setTimeout(_=> {
            loaderCntr.style.transition = ".5s opacity ease"
            loaderCntr.style.opacity = 0
            setTimeout(_=> {
                loaderCntr.remove()
            }, 2500)
        }, 2000)
}

export {hideLoader}