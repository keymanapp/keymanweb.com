import { selectedKbList } from "../state/appState.js"
import { validateURL } from "./validURL.js"

// Compare and remove keyboard
export function removeKbSelected(kbId) {
    if(!kbId) return
    let filtered = selectedKbList.filter(kb => kb.id !== kbId)
    
    // Reset and re-enter the Keyboard selection menu
    selectedKbList.length = 0
    selectedKbList.push(...filtered)
}

// Set the right keyboard help link according to the selected keyboard in the hamburger menu
export function setKbHelpDocHamburger(kbdId, kbdName) {
    const kbHelpDocLink = document.querySelector('#kbHelpdocLink')
    const kbHelpDocSpan = document.querySelector('#kbHelpDocSpan')

    kbHelpDocSpan.innerHTML = `${kbdName}`
    const id = kbdId.split("Keyboard_")
    kbHelpDocLink.addEventListener('click', () => {
        const checkedURL = validateURL(`https://help.keyman.com/keyboard/`)
        const newURL = checkedURL + id
        kbHelpDocLink.href = newURL
    })
}