import { selectedKbList } from "../state/appState.js"
import { generateKbUI, limitKbSelectionUI } from "../feature/kb-selection-menu.js"

// Check 6th keyboard
export function confirmAndAddKb(onConfirmAdd) {
    if (typeof onConfirmAdd != 'function') {
        console.log("Expected the onConfirmAdd a function, instead got: " + typeof onConfirmAdd)
        alert("Click on the keyboard again to enable.")
    }

    // Confirm a 6th keyboard then generate keyboard selection menu
    const warningDialogUI = limitKbSelectionUI(() => {
        onConfirmAdd()
        selectedKbList.shift()
        generateKbUI(selectedKbList) 
    })
    
    document.body.appendChild(warningDialogUI)
}