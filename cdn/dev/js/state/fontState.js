export function getFontSize(element) {
    let fontSize = parseInt(window.getComputedStyle(element).fontSize) || "16"
    return fontSize
}

export function setFontSize(element, value) {
    const fontSizeRange = document.querySelector('#fontSizeRange')
    element.style.fontSize = value + 'px'
    fontSizeRange.value = value
}