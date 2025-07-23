/* 
    This is the code to modify the fetched 
    KeymanWebControls (Map, Examples, Keyboards...etc)
*/

function waitForElement(selector, callback) {
    const interval = setInterval(() => {
        const el = document.querySelector(selector)
        if (el) {
            clearInterval(interval)
            callback(el)
        }
    }, 100)
}

waitForElement(".kmw-osk-frame", function(oskDiv) {
    document.querySelector('.keyboard-area').appendChild(oskDiv)
})