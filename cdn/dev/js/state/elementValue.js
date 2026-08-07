/*
 * Keyman is copyright (C) SIL Global. MIT License.
 * 
 * Created by MengHeng Hav on 2026-08-07
 * 
 * Save and restore the element value for rememberState
*/
export function getElementValue(element) {
    return element.value
}

export function setElementValue(element, value) {
    element.value = value
}