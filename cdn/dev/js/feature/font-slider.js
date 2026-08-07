/*
 * Keyman is copyright (C) SIL Global. MIT License.
 * 
 * Created by MengHeng Hav on 2026-08-05
 * 
 * element and interaction for the font slider tool
 */
export function fontSliderTool() {
    const textArea = document.querySelector('#textArea')
    const fontSliderBtn = document.querySelector('#fontSizeRange')
    fontSliderBtn.addEventListener('input', function() {
        textArea.style.fontSize = `${this.value}px`
    })
}