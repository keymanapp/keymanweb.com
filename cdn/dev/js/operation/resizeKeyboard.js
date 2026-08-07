/*
 * Keyman is copyright (C) SIL Global. MIT License.
 * 
 * Created by MengHeng Hav on 2026-08-07
 * 
 * Resize the keyboard size depending on the mouse down events
 */
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
    keyboardResizing.startWidthBottom = nextElementOfResizer.offsetWidth
    keyboardResizing.startHeightBottom = nextElementOfResizer.offsetHeight

    document.addEventListener('mousemove', mouseMoveGrabber)
    document.addEventListener('mouseup', mouseUpGrabber)
}

// Resizer Deactivate
export function mouseUpGrabber() {
    const keyboardRect = nextElementOfResizer.getBoundingClientRect()
    const textareaRect = prevElementOfResizer.getBoundingClientRect()

    resizer.style.removeProperty('cursor')
    keyboardResizing.isResizing = false

    keyboardResizing.startHeightTop = textareaRect.height
    keyboardResizing.startHeightBottom = keyboardRect.height
    keyboardResizing.startWidthBottom = keyboardRect.width

    document.removeEventListener('mousemove', mouseMoveGrabber)
    document.removeEventListener('mouseup', mouseUpGrabber)
}

// Resizer In-process
export function mouseMoveGrabber(e) {
    if (!keyboardResizing.isResizing) return;

    let deltaY = e.clientY - keyboardResizing.startY   // Get up or down direction

    let newTextareaHeight = keyboardResizing.startHeightTop + deltaY
    let newKeyboardHeight = keyboardResizing.startHeightBottom - deltaY

    // Initial keyboard height = 400px
    // Drag divider UP 100px:
    // deltaY = -100
    // newKeyboardHeight = 400 - (-100) = 500px

    newTextareaHeight = Math.max(100, Math.min(newTextareaHeight, window.innerHeight))
    newKeyboardHeight = Math.max(keyboardResizing.minKeyboardHeight, Math.min(newKeyboardHeight, keyboardResizing.maxKeyboardHeight))

    let newKeyboardWidth = keyboardResizing.startWidthBottom - deltaY
    newKeyboardWidth = Math.max(keyboardResizing.minKeyboardWidth, Math.min(newKeyboardWidth, keyboardResizing.maxKeyboardWidth))

    applyWidths(newKeyboardWidth)
    applyHeights(newTextareaHeight, newKeyboardHeight)
    
    if (newTextareaHeight > 700) {
        fullScreenSize()
    } else {
        nextElementOfResizer.style.display = 'flex'
    }
}

// Apply heights for two elements
export function applyHeights(taHeight, kbHeight) {
    prevElementOfResizer.style.height = `${taHeight}px`
    nextElementOfResizer.style.height = `${kbHeight}px`
}

// Apply heights 
export function applyWidths(kbWidth) {
    nextElementOfResizer.style.width = `${kbWidth}px`
}

function calcHeight(kbHeight) {
    const aspectRatio = 1.8

    return kbHeight * aspectRatio
}
