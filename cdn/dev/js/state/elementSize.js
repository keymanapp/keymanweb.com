/*
 * Keyman is copyright (C) SIL Global. MIT License.
 * 
 * Created by MengHeng Hav on 2026-08-07
 * 
 * Save and restore the element size for rememberState
*/
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