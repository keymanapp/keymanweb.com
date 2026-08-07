/*
 * Keyman is copyright (C) SIL Global. MIT License.
 * 
 * Created by MengHeng Hav on 2026-08-07
 * 
 * Save and restore the font size for rememberState
*/
export function getFontSize(element) {
    let fontSize = parseInt(window.getComputedStyle(element).fontSize) || "16"
    return fontSize
}

export function setFontSize(element, value) {
    const fontSizeRange = document.querySelector('#fontSizeRange')
    element.style.fontSize = value + 'px'
    fontSizeRange.value = value
}