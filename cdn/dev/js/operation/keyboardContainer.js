/*
 * Keyman is copyright (C) SIL Global. MIT License.
 * 
 * Created by MengHeng Hav on 2026-06-29
 * 
 * Bundle all the selected keyboards for the Keyboard Container.
 */
import { selectedKbList } from "../state/appState.js"
import { kbContainerUI, kbContainerLimits, reorderSelectedKbList, removeFromKbContainer } from "../feature/kb-container.js"
import { checkSearchCardStatus } from "../feature/search.js"
import { setKeyboard } from "./keyboardDataPackage.js"

export function storeInKbContainer(element, oneKb, kbData) {
    const keyboardSelectionButton = document.getElementById('keyboardSelectionButton')

    let isSelected = selectedKbList.some(selected => selected.id == oneKb.id) // Check which keyboard is already in the keyboard container
    
    // Remove keyboard
    if (isSelected) {
        removeFromKbContainer(oneKb.id) 
        kbContainerUI(selectedKbList) // Generate keyboard container UI
        checkSearchCardStatus(element, oneKb)
        return
    }
    
    if(selectedKbList.length < 5) { // if keyboard container has less than 5 keyboards
        kbDataForKbContainer(oneKb) // continue to add it to the container
        kbContainerUI(selectedKbList)
        checkSearchCardStatus(element, oneKb) 
        return
    } 

    // if the keyboards in the keyboard container has over 5, there's a confirmation needed before adding a new keyboard
    confirmAndAddKb(() => {
        kbDataForKbContainer(oneKb)
        kbContainerUI(selectedKbList)
        checkSearchCardStatus(element, oneKb)
        return
    })
}

// Add keyboard for kb search and container UI
export function kbDataForKbContainer(kb) {
    const kbInfo = {
        "id": kb.id,
        "name": kb.name,
        "version": kb.version,
        "helpLink": kb.helpLink,
        "sourcePath": kb.sourcePath,
        "supportedLanguage": kb.languages,
        "lastUpdated": kb.lastModifiedDate
    }
    selectedKbList.push(kbInfo)
}

// Check 6th keyboard
export function confirmAndAddKb(onConfirmAdd) {
    if (typeof onConfirmAdd != 'function') {
        console.log("Expected the onConfirmAdd a function, instead got: " + typeof onConfirmAdd)
        alert("Click on the keyboard again to enable.")
    }

    // Confirm on the 6th keyboard and then generate keyboard container
    const warningDialogUI = kbContainerLimits(() => {
        onConfirmAdd()
        selectedKbList.shift()
        kbContainerUI(selectedKbList)
    })
    
    document.body.appendChild(warningDialogUI)
}