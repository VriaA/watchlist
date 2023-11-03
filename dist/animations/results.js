import galleryCardsHoverAnimation from "./galleryCards.js"

function animateIn() {
    const posters = document.querySelectorAll('.card')

    const tl = gsap.timeline()
    tl.from('#results-wrapper', {scale: .5, opacity:0, duration: .5, ease: "expoScale"})
    tl.fromTo(posters, {opacity: 0, y: 56}, {opacity: 1, y: 0, duration: .3, stagger: .2, ease: "power2.out"})
    tl.fromTo('.left-arrow', {opacity: 0}, {opacity: .3, duration: .2, ease: "power2.out"}, .6)
    tl.fromTo('.right-arrow', {opacity: 0}, {opacity: 1, duration: .2, ease: "power2.out"}, '<')
    tl.fromTo('#results-header', {y: -56, opacity: 0,}, {y: 0, opacity: 1, duration: 1, ease: "bounce.in"}, 1)

    galleryCardsHoverAnimation(posters)
}

function reenableResultsPageAnimation() {
    const resultsVisited = JSON.parse(sessionStorage.getItem('results-page-visited'))
    if(resultsVisited) {
        sessionStorage.removeItem('results-page-visited')
    }
}

export {animateIn, reenableResultsPageAnimation}