export default function galleryCardsHoverAnimation(cards) {
    cards.forEach(card=> {
        card.addEventListener('mouseover', (e)=> {
            gsap.to(card, {scale: 1.05, duration: .1, ease: 'power.out'})
        })

        card.addEventListener('mouseleave', (e)=> {
            gsap.to(card, {scale: 1, duration: .1, ease: 'expo.in'})
        })
    })
}