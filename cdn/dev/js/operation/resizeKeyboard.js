import { keyboardResizing } from "../state/appState.js";
import { fullScreenSize } from "./resizeTextArea.js";

const divider = document.getElementById('Divider')

const resizer = divider.querySelector('#resizeGrip')
const prevElementOfResizer = divider.previousElementSibling
const nextElementOfResizer = divider.nextElementSibling

// Resizer Activate
export function mouseDownGrabber(e) {
    e.preventDefault();
    resizer.style.cursor = 'grabbing'
    keyboardResizing.isResizing = true

    keyboardResizing.startY = e.clientY
    keyboardResizing.startHeightTop = prevElementOfResizer.offsetHeight
    keyboardResizing.startHeightBottom = nextElementOfResizer.offsetHeight

    document.addEventListener('mousemove', mouseMoveGrabber)
    document.addEventListener('mouseup', mouseUpGrabber)
}

// Resizer Deactivate
export function mouseUpGrabber() {
    resizer.style.removeProperty('cursor')
    keyboardResizing.isResizing = false
    document.removeEventListener('mousemove', mouseMoveGrabber)
}

// Resizer In-process
export function mouseMoveGrabber(e) {
    if (!keyboardResizing.isResizing) return;

    let deltaY = e.clientY - keyboardResizing.startY   // Get up or down direction

    let newTextareaHeight = keyboardResizing.startHeightTop + deltaY
    let newKeyboardHeight = keyboardResizing.startHeightBottom - deltaY

    newTextareaHeight = Math.max(100, Math.min(newTextareaHeight, window.innerHeight * 0.8))
    newKeyboardHeight = Math.max(100, Math.min(newKeyboardHeight, window.innerHeight * 0.5))

    applyTextareaHeight(newTextareaHeight)
    
    if (newTextareaHeight > 700) {
        fullScreenSize()
    } else {
        nextElementOfResizer.style.display = 'flex'
    }
}

// Apply heights for two elements
export function applyHeights(taHeight, kbHeight) {
    prevElementOfResizer.style.height = `${taHeight}px`
    // nextElementOfResizer.style.height = `${kbHeight}px`
}

// Apply heights 
export function applyTextareaHeight(taHeight) {
    prevElementOfResizer.style.height = `${taHeight}px`
}
