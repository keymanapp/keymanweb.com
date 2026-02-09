import { textAreaState } from "../state/appState.js"
import { defaultSize, fullScreenSize } from "../operation/resizeTextArea.js"

// Identical to hide-keyboard.js but this is for Desktop screen size
export function hideKeyboard() {
    const hideKeyboardBtn = document.querySelector('#hideKeyboard')
    hideKeyboardBtn?.addEventListener('click', () => {
        if (textAreaState.isTextAreaFullHeight) {
            defaultSize()
        } else {
            fullScreenSize()
        }
    })
}