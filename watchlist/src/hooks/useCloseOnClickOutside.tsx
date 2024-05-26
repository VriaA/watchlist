import { RefObject, useEffect } from "react"
type clickOutside = MouseEvent | TouchEvent | KeyboardEvent
type THideOnClickOutside = (e: clickOutside, element: HTMLElement, trigger: HTMLButtonElement | undefined | null)=> void

export default function useCloseOnClickOutside(element: RefObject<HTMLElement | null>, trigger?: RefObject<HTMLButtonElement | null>): void {
    useEffect(()=> {
        if(!element) return
        function hideSuggestionOnClickOutside (e: MouseEvent): void {
            const elementToHide = element.current as HTMLUListElement
            hideOnClickOutside(e, elementToHide, trigger?.current)
        }
        
        document.addEventListener('click',  hideSuggestionOnClickOutside)
        return ()=> document.removeEventListener('click', hideSuggestionOnClickOutside)
    }, [element.current, trigger?.current]) 

    const hideOnClickOutside : THideOnClickOutside = (e, element, trigger): void=>  {
        const isHidden: boolean = element.classList.contains('hidden')

        if( (e.target !== element) && (!isHidden) ) {
            if(((trigger) && (e.target !== trigger) && !trigger.contains(e.target as HTMLElement))) {
                element.classList.remove(`${'flex' || 'grid' || 'block' }`)
                element.classList.add('hidden')
            } else if (!trigger) {
                element.classList.remove(`${'flex' || 'grid' || 'block' }`)
                element.classList.add('hidden')
            }
        
        } 
    }
}