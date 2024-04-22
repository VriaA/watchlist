type clickOutside = MouseEvent | TouchEvent | KeyboardEvent
type THideOnClickOutside = (e: clickOutside, element: HTMLElement)=> void

export const hideOnClickOutside : THideOnClickOutside = (e, element): void=>  {
    const isHidden: boolean = element.classList.contains('hidden')
    if((e.target !== element) && (!isHidden)) {
        element.classList.remove(`${'flex' || 'grid' || 'block' }`)
        element.classList.add('hidden')
    }
}