// Wait for a later-loaded element
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