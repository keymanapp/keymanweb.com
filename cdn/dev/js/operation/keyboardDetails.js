import { removeKbSelected } from "./selectedKb.js"
import { generateKbUI, triggerKbCount } from "../feature/kb-selection-menu.js"
import { selectedKbList } from "../state/appState.js"

// Keyboard selection menu's tools: info, help, download, and remove
export function kbConfigMenu(action, id, helplink) {
    if (action == "help") {
        window.open(helplink, '_blank')
    }

    if (action == "download") {
        const downloadUrl = `https://keyman.com/keyboards/install/${id}`
        window.open(downloadUrl, '_blank')
    }

    if (action == "remove") {
        removeKbSelected(id)
        generateKbUI(selectedKbList)
        triggerKbCount(selectedKbList)
        searchDropdown.hide()
    }

    if (action == "info") {
        const kbDetails = document.querySelector(`#keyboard-${id}-details`)
        
        kbDetails.addEventListener('mouseleave', () => {
            kbDetails.classList.add('hidden')
        })
        kbDetails.classList.remove('hidden')
    }
}