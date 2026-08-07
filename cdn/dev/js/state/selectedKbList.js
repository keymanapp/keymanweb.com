/*
 * Keyman is copyright (C) SIL Global. MIT License.
 * 
 * Created by MengHeng Hav on 2026-08-07
 * 
 * Save and restore all selected keyboards for rememberState
*/
import { selectedKbList } from "./appState.js"

export function setSelectedKb(kbList) {
    selectedKbList.length = 0
    selectedKbList.push(...kbList)
}

export function getSelectedKb() {
    return selectedKbList
}