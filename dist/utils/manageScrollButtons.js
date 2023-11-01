export default function manageScrollButtons() {
    const galleries = document.querySelectorAll('.gallery')
    galleries.forEach(gallery=> {
        manageScrollButtonsOnLoad(gallery)
        manageScrollButtonsOnScroll(gallery)
    })
}
function manageScrollButtonsOnScroll(gallery) {
        gallery.addEventListener('scroll', function() {
            const isStart = gallery.scrollLeft <= 20
            const isEndReached = gallery.scrollLeft + gallery.clientWidth >= gallery.scrollWidth - 10
            const leftArrow = document.getElementById(`${this.dataset.gallery}-left-arrow`)
            const rightArrow = document.getElementById(`${this.dataset.gallery}-right-arrow`)
            
            changeScrollButtonOpacity(isStart, isEndReached, leftArrow, rightArrow)
        })
}

function manageScrollButtonsOnLoad(gallery) {
    const isStart = gallery.scrollLeft <= 20
    const isEndReached = gallery.scrollLeft + gallery.clientWidth >= gallery.scrollWidth
    const leftArrow = document.getElementById(`${gallery.dataset.gallery}-left-arrow`)
    const rightArrow = document.getElementById(`${gallery.dataset.gallery}-right-arrow`)

    changeScrollButtonOpacity(isStart, isEndReached, leftArrow, rightArrow)
}

function changeScrollButtonOpacity(isStart, isEndReached, leftArrow, rightArrow) {
    if(!leftArrow) return
    switch (true) {
        case isStart && isEndReached:
            rightArrow.style.opacity = '0.2'
            leftArrow.style.opacity = '0.2'
        break;
        case isEndReached:
            rightArrow.style.opacity = '0.2'
        break;
        case isStart:
            leftArrow.style.opacity = '0.2'
        break;
        default:
            leftArrow.style.opacity = '1'
            rightArrow.style.opacity = '1'
    }
}