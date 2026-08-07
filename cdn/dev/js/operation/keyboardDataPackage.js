/*
 * Keyman is copyright (C) SIL Global. MIT License.
 * 
 * Created by MengHeng Hav on 2026-08-07
 * 
 * Package the required data for the keyboard to load when it is selected.
 */
import { kbData } from "../state/appState.js"

// Set Keyboard Data from AppState
export function setKeyboard(id, lang, name) {
    kbData.kbdId = id
    kbData.langCode = lang
    kbData.kbdName = name
}

// Get Keyboard Data from AppState
export function getKeyboard() {
    return {
        kbdId: kbData.kbdId,
        langCode: kbData.langCode,
        kbdName: kbData.kbdName
    }
}
