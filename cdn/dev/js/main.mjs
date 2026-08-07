/*
 * Keyman is copyright (C) SIL Global. MIT License.
 * 
 * Created by MengHeng Hav on 2026-08-05
 * 
 * This is the main base of every elements interacting with each other.
*/

// Tool imports
import { eraserTool } from "./feature/eraser.js"
import { copyTool } from "./feature/copy.js"
import { fontSliderTool } from "./feature/font-slider.js"
import { expandTool } from "./feature/expand-textarea.js"
import { hideKeyboard } from "./feature/hide-keyboard.js"
import { mouseDownGrabber } from "./operation/resizeKeyboard.js"
import { renderToolsTray } from "./feature/tool-tray.js"

// Pagination-related imports
import { searchState } from "./state/appState.js"
import { goPrevPage, goNextPage, updatePaginationCtrl } from "./feature/pagination.js"
import { setKeyboard } from "./operation/keyboardDataPackage.js"
import { handleSearch, defaultSearch } from "./operation/searchLogic.js"

// Keyboard imports
import { defaultSize } from "./operation/resizeTextArea.js"
import { setKeyboardToType } from "./operation/keyboard.js"

import { waitForElement } from "./operation/waitForElement.js"
waitForElement(".kmw-osk-frame").then((oskDiv) => {
    document.querySelector('.keyboard-area').appendChild(oskDiv)
})

// Local Storage
import { buildAppState, loadSettings } from "./operation/rememberState.js"
import { setEnabledKb } from "./state/enableKb.js"

// Search Components
const clearSearchIcon = document.querySelector('#clearSearchIcon')

// Pagination Components
const prevBtn = document.getElementById('prevPage')
const nextBtn = document.getElementById('nextPage')

// Keyboard Selection Menu Components
const keyboardSelectionButton = document.querySelector('#keyboardSelectionButton')

// Search Components
const searchInput = document.querySelector('#searchInput')
const searchDropdownMenu = document.querySelector('#searchDropdownMenu')
const searchDropdown = new bootstrap.Dropdown(searchInput)

document.addEventListener('DOMContentLoaded', () => {
    // Tool Tray for Mobile, Tablet, and Desktop layouts
    renderToolsTray()
    // Eraser
    eraserTool(document.querySelector("#eraseTool"))
    // Copy
    copyTool(document.querySelector("#copyTool"))
    // Font slider
    fontSliderTool(document.querySelector("#fontSizeRange"))
    // Expand text area (Tablet and Mobile)
    expandTool(document?.querySelector("#expandTool"))
    // Expand text area (Desktop)
    hideKeyboard(document.querySelector('#hideKeyboard'))

    // Pagination
    prevBtn.addEventListener('click', goPrevPage)
    nextBtn.addEventListener('click', goNextPage)

    // Resizer (between textarea and keyboard)
    const resizeGrip = document.querySelector('#resizeGrip')
    resizeGrip.addEventListener('mousedown', mouseDownGrabber)

    // Set keyboard & examples to load
    setKeyboardToType()

    /* Search Interaction */
    // Close search dropdown when clicking outside the dropdown menu
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchDropdownMenu.contains(e.target)) {
            searchDropdown.hide()
        }
    })

    searchInput.addEventListener('focus', (e) => {
        // Ensure that the search always has the English keyboard 
        setKeyboard('basic_kbdus', 'en', 'US Basic')
        setKeyboardToType()

        searchDropdown.show()
        searchInput.placeholder = 'Search for a keyboard...'
    })

    searchInput.addEventListener('click', (e) => {
        handleSearch(e)
    })

    searchInput.addEventListener('input', (e) => {
        handleSearch(e)
    })

    // Click on clear if there's input
    clearSearchIcon.addEventListener('click', (e) => {
        let query = e.target.value
        handleSearch(query)
        searchInput.value = ''
        searchInput.focus()
    })

    // Default text area and keyboard size
    defaultSize()

    window.addEventListener('load', () => {
        const state = loadSettings()
        if(state?.enabledKb) {
            setEnabledKb(state.enabledKb)
        }
    })

    window.addEventListener('beforeunload', buildAppState)

    window.addEventListener('storage', (e) => {
        if (e.key == "keymanWebState") {
            loadSettings()
        }
    })

})

import { showPopUpDialog } from "./feature/instruction.js"

const instructionDialog = document.getElementById('instructionModalOverlay')
const openInstructionBtn = document.getElementById('getStartedBtn')

openInstructionBtn.addEventListener('click', () => {
    showPopUpDialog(instructionDialog)
})
