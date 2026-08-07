/*
 * Keyman is copyright (C) SIL Global. MIT License.
 * 
 * Created by MengHeng Hav on 2026-08-07
 * 
 * Wait for later-loaded elements such as .kmw-osk-frame
 */
export function waitForElement(selector) {
    return new Promise((resolve) => {
        const interval = setInterval(() => {
            const element = document.querySelector(selector)
            if (element) {
                clearInterval(interval)
                resolve(element)
            }
        }, 100)
    })
}