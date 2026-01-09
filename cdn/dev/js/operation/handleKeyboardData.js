import { kbData } from "../state/appState.js"

// Set Keyboard Data from AppState
export function setKeyboard(id, lang, name) {
    kbData.kbdId = id
    kbData.langCode = lang
    kbData.kbdName = name
}

// Fetch Keyboard Data from AppState
export function getKeyboard() {
    return {
        kbdId: kbData.kbdId,
        langCode: kbData.langCode,
        kbdName: kbData.kbdName
    }
}
