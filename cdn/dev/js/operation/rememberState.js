import { storage } from "../state/storage.js"
import { getFontSize, setFontSize } from "../state/fontState.js"
import { getElementValue, setElementValue } from "../state/elementValue.js"
import { getElementsSize, setElementsSize } from "../state/elementSize.js"
import { getEnabledKb, setEnabledKb } from "../state/enableKb.js"
import { getSelectedKb, setSelectedKb } from "../state/selectedKbList.js"
import { generateKbUI } from "../feature/kb-selection-menu.js"

const textAreaContainer = document.querySelector('.textarea-container')
const textArea = document.querySelector('#textArea')

const STORAGE_KEY = "keymanWebStorage"
const EXP = 60 * 60 * 1000 // 1 hour

export function buildAppState() {
    const state = {
        fontSize: getFontSize(textArea),
        selectedKbList: getSelectedKb(),
        enabledKb: getEnabledKb(),
        textAreaSizes: getElementsSize(textAreaContainer),
        writtenText: getElementValue(textArea),
    }
    storage.set(STORAGE_KEY, state, EXP)
}

export function loadSettings() {
    const state = storage.get(STORAGE_KEY)

    if(!state) return
    setElementsSize(textAreaContainer, state.textAreaSizes)
    setSelectedKb(state.selectedKbList)
    generateKbUI(state.selectedKbList)
    setEnabledKb(state.enabledKb)
    setElementValue(textArea, state.writtenText)
    setFontSize(textArea, state.fontSize)
}
