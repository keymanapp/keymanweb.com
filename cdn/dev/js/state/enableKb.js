import { setKeyboard } from "../operation/handleKeyboardData.js";
import { setKeyboardToType } from "../operation/keyboard.js";
import { selectedKbList } from "./appState.js";

export function getEnabledKb() {
    let match = location.hash.match(/^#(.+),(Keyboard_.+)$/i)
    if(!match) return null;

    const [, langCode, rawKbFromHash] = match

    let kbdId = rawKbFromHash.replace('Keyboard_', '')

    let kbdName = selectedKbList.find(kb => kb.id == kbdId).name

    return {
        langCode,
        kbdId,
        kbdName
    }
}

export function setEnabledKb(enabledKb) {
    if(!enabledKb) return

    const {kbdId, langCode, kbdName} = enabledKb
    
    setKeyboard(kbdId, langCode, kbdName)
    setKeyboardToType()
}