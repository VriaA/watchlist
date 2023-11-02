import galleryCardsHoverAnimation from './galleryCards.js'

function animateFilmIn() {
    let tl = gsap.timeline()
      
    tl.from('#film', {scale: 0.5, opacity: 0, ease: 'expoScale', delay: 2})
    tl.fromTo('.text-to-reveal', {clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)'}, {clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', duration: 1})
    tl.from('.film-cta-btn-cntr', {opacity: 0, ease: "sine.in"})
    tl.fromTo('#scroll-indicator-thumb', {opacity: 0}, {opacity: 1, ease: "sine.in"})
    tl.to('#scroll-indicator-thumb', {repeat: -1, yoyo: true, y: 32, opacity: 1, duration: 2, ease: "sine.in"})
}

function animateFIlmGalleries() { 
    const galleryCntrs = document.querySelectorAll('.gallery-cntr')

    const galleryCntrObsever = new IntersectionObserver( (entries)=> {
        entries.forEach(entry=> {

            if(entry.isIntersecting) {
                const galleryTitle = entry.target.dataset.gallery
                const hiddenTitleUnderlines = document.querySelectorAll(`.gallery-title-underline-${galleryTitle}`)
                const hiddenImageCards = document.querySelectorAll(`.card-${galleryTitle}`);
                const scrollArrowBtns = document.querySelectorAll(`.arrows-${galleryTitle}`)
                    
                const tl = gsap.timeline()
                tl.from(hiddenTitleUnderlines, {width: 0, duration: .5, delay: .5, ease: "power1.out"})
                tl.fromTo(hiddenImageCards, {y: 56, opacity: 0}, {y: 0, opacity: 1, duration: .5, stagger: .2,ease: "expoScale"})
                tl.from(scrollArrowBtns, {opacity: 0, ease: "sine.out"}, 1.5)

                galleryCardsHoverAnimation(hiddenImageCards)
            } 
        })
    })

    galleryCntrs.forEach(galleryCntr=> galleryCntrObsever.observe(galleryCntr))
}

export {animateFilmIn, animateFIlmGalleries}