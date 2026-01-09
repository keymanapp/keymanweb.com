export function fontSliderTool() {
    const textArea = document.querySelector('#textArea')
    const fontSliderBtn = document.querySelector('#fontSizeRange')
    fontSliderBtn.addEventListener('input', function() {
        textArea.style.fontSize = `${this.value}px`
    })
}