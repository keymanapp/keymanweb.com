import { textAreaState } from "../state/appState.js"
import { defaultSize, fullScreenSize } from "../operation/resizeTextArea.js"

// Identical to hide-keyboard.js but this is for Tablet & Mobile screen size
export function expandTool() {
    const expandTool = document.querySelector('#expandTool')
    expandTool?.addEventListener('click', () => {
        if (textAreaState.isTextAreaFullHeight) {
            defaultSize()
        } else {
            fullScreenSize()
        }
    })
}