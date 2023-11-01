export default function animateIn() {
    const filtersCntr = document.getElementById('filters')
    const savedFilms = document.querySelectorAll('.saved-film')

    const tl = gsap.timeline()
    
    tl.from('#heading', {scale: .3, opacity: 0, duration: .3})
    tl.from(filtersCntr, {opacity: 0, duration: .2, stagger: .1, ease: "sine.out"})
    tl.fromTo(savedFilms, {opacity: 0, y: 56}, {opacity: 1, y: 0, duration: .5, stagger: .25, ease: "sine.out"})
}