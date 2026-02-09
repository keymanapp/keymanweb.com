import { selectedKbList } from "./appState.js"

export function setSelectedKb(kbList) {
    selectedKbList.length = 0
    selectedKbList.push(...kbList)
}

export function getSelectedKb() {
    return selectedKbList
}