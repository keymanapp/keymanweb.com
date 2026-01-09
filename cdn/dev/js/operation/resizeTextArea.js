import { textAreaState } from "../state/appState.js"

const divider = document.querySelector('.divider-container')
const prevElementOfResizer = divider.previousElementSibling
const nextElementOfResizer = divider.nextElementSibling

// Set default height for Textarea and Keyboard
export function  defaultSize() {
    prevElementOfResizer.style.height = `${textAreaState.defaultHeightTextArea}vh`
    nextElementOfResizer.style.height = `${textAreaState.defaultHeightKb}vh`
    textAreaState.isTextAreaFullHeight = false 
    nextElementOfResizer.style.display = 'flex'
}

// Set full height (Fullscreen) for Textarea
export function fullScreenSize() {
    prevElementOfResizer.style.height = `${textAreaState.fullHeightTextArea}vh`
    textAreaState.isTextAreaFullHeight = true
    nextElementOfResizer.style.display = 'none'
}
