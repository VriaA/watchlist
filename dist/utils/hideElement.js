export default function hideElement() {
    const elementsToHide = document.querySelectorAll('.to-hide')

    document.body.addEventListener('click', e=> {
        elementsToHide.forEach(elementToHide=> {
            const elementToHideVisibilityToggler = document.querySelector(`.to-hide-visibility-toggler-${elementToHide.dataset.toHide}`)
            const isNotClicked = elementToHide !== e.target && !elementToHide.contains(e.target)
            const isVisible = !elementToHide.classList.contains('invisible')

            if(isNotClicked && isVisible && e.target !== elementToHideVisibilityToggler) {
                elementToHide.classList.add('invisible')
            }
        })
    })
}