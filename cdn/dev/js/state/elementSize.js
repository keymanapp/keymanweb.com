export function getElementsSize(element) {
    const rect = element.getBoundingClientRect()
    return {
        height: rect.height,
        positionX: rect.x,
        positionY: rect.y
    }
}

export function setElementsSize(element, sizes) {
    element.style.height = sizes.height + "px"
}