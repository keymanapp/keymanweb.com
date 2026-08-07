import { removeFromKbContainer, kbContainerUI } from "../feature/kb-container.js"
import { selectedKbList } from "../state/appState.js"

// Keyboard container's tools: info, help, download, and remove
export function kbConfigMenu(action, id, helplink) {
    if (action == "help") {
        window.open(helplink, '_blank')
    }

    if (action == "download") {
        const downloadUrl = `https://keyman.com/keyboards/install/${id}`
        window.open(downloadUrl, '_blank')
    }

    if (action == "remove") {
        removeFromKbContainer(id)
        kbContainerUI(selectedKbList)
    }

    if (action == "info") {
        const kbDetails = document.querySelector(`#keyboard-${id}-details`)
        
        kbDetails.addEventListener('mouseleave', () => {
            kbDetails.classList.add('hidden')
        })
        kbDetails.classList.remove('hidden')
    }
}