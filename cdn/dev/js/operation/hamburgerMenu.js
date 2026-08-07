/*
 * Keyman is copyright (C) SIL Global. MIT License.
 * 
 * Created by MengHeng Hav on 2026-08-07
 * 
 * All the links and content in the hamburger menu
 */
import { selectedKbList } from "../state/appState.js"
import { validateURL } from "./validURL.js"

// Set the right keyboard help link in the hamburger menu according to the selected keyboard
export function setKbHelpDocHamburger(kbdId, kbdName) {
    const kbHelpDocLink = document.querySelector('#kbHelpdocLink')
    const kbHelpDocSpan = document.querySelector('#kbHelpDocSpan')
    const adsGuide = document.getElementById('adsGuide')
    const getKbGuide = document.getElementById('getKbGuide')
    const kbHelpGuide = document.getElementById('kbHelpGuide')
    const getKbDownload = document.getElementById('downloadKb')
    
    // Elements' content
    adsGuide.innerHTML = `More ways to use the ${kbdName}`
    getKbGuide.innerHTML = `Get ${kbdName} for your device. Keyman is completely free to use on all devices!`
    kbHelpGuide.innerHTML = `The ${kbdName} help`
    kbHelpDocSpan.innerHTML = `${kbdName}`

    // Set the link for the help doc page
    const id = kbdId.split("Keyboard_")
    kbHelpDocLink.addEventListener('click', () => {
        const checkedURL = validateURL(`https://help.keyman.com/keyboard/`)
        const newURL = checkedURL + id
        kbHelpDocLink.href = newURL
    })

    // Set the link for the download page
    getKbGuide.addEventListener('click', () => {
        getKbDownload.href = `https://keyman.com/keyboards/install/${id}`
    })
}