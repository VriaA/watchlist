//SCROLLS THE GALLERY LEFT BY ITS WIDTH
export function scrollLeft(gallery: HTMLDivElement | null): void {
    if(!gallery) return
            const galleryWidth = gallery.offsetWidth
            gallery.scrollLeft -= galleryWidth
}
    
//SCROLLS THE GALLERY RIGHT BY ITS WIDTH
export function scrollRight(gallery: HTMLDivElement | null): void {
    if(!gallery) return
    const galleryWidth = gallery.offsetWidth
    gallery.scrollLeft += galleryWidth
}