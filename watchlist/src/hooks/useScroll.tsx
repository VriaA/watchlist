import { useRef } from "react"

export default function useScroll(): {
    galleryRef: React.MutableRefObject<HTMLDivElement | null>;
    leftArrowRef: React.MutableRefObject<HTMLButtonElement | null>;
    rightArrowRef: React.MutableRefObject<HTMLButtonElement | null>;
    changeArrowOpacity: ()=> void;
    scrollLeft: ()=> void;
    scrollRight: ()=> void;
} {

    const galleryRef = useRef<HTMLDivElement | null>(null)
    const leftArrowRef = useRef<HTMLButtonElement | null>(null)
    const rightArrowRef = useRef<HTMLButtonElement | null>(null)

    //SCROLLS THE GALLERY LEFT BY ITS VISIBLE WIDTH
    function scrollLeft(): void {
        const gallery = galleryRef.current
        if(!gallery) return
        const galleryWidth = gallery.offsetWidth
        gallery.scrollLeft -= galleryWidth
    }
    
    //SCROLLS THE GALLERY RIGHT BY ITS VISIBLE WIDTH
    function scrollRight(): void {
        const gallery = galleryRef.current
        if(!gallery) return
        const galleryWidth = gallery.offsetWidth
        gallery.scrollLeft += galleryWidth
    }

    // REDUCES THE OPACITY OF THE LEFT AND RIGHT ARROWS WHEN A USER CANNOT SCROLL LEFT OR RIGHT
    // REDUCES THE OPACITY OF THE LEFT ARROW WHEN THE LEFT END/START IS REACHED AND A USER CANNOT SCROLL LEFT
    // REDUCED THE OPACITY OF THE LEFT ARROW WHEN THE RIGHT END/END IS REACHED AND A USER CANNOT LONGER SCROLL RIGHT
    // SETS THE OPACITY TO 1 WHEN NO END IS REACHED AND A USER CAN SCROLL IN ANY DIRECTION
    function changeArrowOpacity() {
        const gallery = galleryRef.current
        const leftArrow = leftArrowRef.current
        const rightArrow = rightArrowRef.current
        if((gallery && leftArrow && rightArrow)) {
            
            const isStart: boolean = gallery.scrollLeft <= 20
            const isEnd:  boolean = gallery.scrollLeft + gallery.offsetWidth >= gallery.scrollWidth
            switch (true) {
                case isStart && isEnd:
                    leftArrow.style.opacity = '.2'
                    rightArrow.style.opacity = '.2'
                break;
                case isStart:
                    leftArrow.style.opacity = '.2'
                break;
                case isEnd: 
                    rightArrow.style.opacity = '.2'
                break;
                default: 
                    rightArrow.style.opacity = '1'
                    leftArrow.style.opacity = '1'
            }
        }
    }
    changeArrowOpacity()

    return { galleryRef, leftArrowRef, rightArrowRef, changeArrowOpacity, scrollLeft, scrollRight }
}