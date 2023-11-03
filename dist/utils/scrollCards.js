export default function scrollCards() {
    scrollToStart()
    
    const galleryCntrs = document.querySelectorAll('.gallery-cntr')
    
    galleryCntrs.forEach(cntr=> {
        cntr.addEventListener('click', (e)=> {
        
            if(e.target.classList.contains('left-arrow')) {
                const gallery = document.getElementById(`gallery-${e.target.dataset.arrow}`)
                    scrollLeft(gallery)
            } else if(e.target.classList.contains('right-arrow')) {
                const gallery = document.getElementById(`gallery-${e.target.dataset.arrow}`)
                    scrollRight(gallery)
            }
        })
    })
}

//SCROLLS THE GALLERY CONTAINER TO THE EXTREME LEFT/STARTING POSITION
//ENABLES SCROLL SNAP FOR ALL POSTERS AFTER .4 SECONDS
function scrollToStart() {
    const galleries = document.querySelectorAll('.gallery');

    galleries.forEach(gallery=> {
        if(gallery) { gallery.scrollTo(0, 0); }
        if(gallery && gallery.children) { setTimeout(_=> gallery.classList.add('snap-x', 'snap-mandatory'), 510) }
    })
}

//SCROLLS THE GALLERY LEFT BY ITS WIDTH
function scrollLeft(gallery) {
            const galleryWidth = gallery.offsetWidth
            gallery.scrollLeft -= galleryWidth
}

//SCROLLS THE GALLERY RIGHT BY ITS WIDTH
function scrollRight(gallery) {
    const galleryWidth = gallery.offsetWidth
    gallery.scrollLeft += galleryWidth
}