document.addEventListener('DOMContentLoaded', function() {
    // Define the divider, text area and keyboard
    const divider = document.getElementById('Divider')
    const resizer = divider.querySelector('.fa-bars')
    let prevElement = divider.previousElementSibling.querySelector('.text-area');
    let nextElement = divider.nextElementSibling;
    let isResizing = false;
    
    // Define the heights of text area, keyboard, and the vertical screen
    let prevElementHeight = 0;
    let prevElementWidth = 0;
    let verticalViewport = 0;

    const mouseDownHandler = (e) => {
        e.preventDefault();
        resizer.style.cursor = 'ns-resize'
        isResizing = true

        // Get the Y coordinate of mouse click & Text Area + Keyboard heights
        prevElementHeight = prevElement.getBoundingClientRect().height;
        prevElementWidth = prevElement.getBoundingClientRect().width;
        verticalViewport = e.clientY;

        document.addEventListener('mousemove', mouseMoveHandler)
        document.addEventListener('mouseup', mouseUpHandler)
    }

    const mouseUpHandler = () => {
        resizer.style.removeProperty('cursor')
        isResizing = false
    }

    const mouseMoveHandler = function (e) {
        if (!isResizing) return;
        // Calculate the cursor movement
        let value = e.clientY - verticalViewport
        let clientX = e.clientX
        calcElementSize(value, clientX)
    }

    function calcElementSize(val, x) {
        // Get the dynamic heights of both elements
        let newPrevHeight = prevElementHeight + val;
        let newNextWidth = (x / prevElementWidth) * 150;

        // Define minimum and maximum heights
        const minPrevHeight = 150; 
        const maxPrevHeight = window.innerHeight * 0.6;
        const minNextWidth = 50;
        const maxNextWidth = 80;

        // Ensure the heights do need exceed the define heights
        newPrevHeight = Math.max(minPrevHeight, Math.min(newPrevHeight, maxPrevHeight));
        newNextWidth = Math.max(minNextWidth, Math.min(newNextWidth, maxNextWidth));

        const keyboardContainer = nextElement.querySelector('.keyboard-container')

        // Update the heights of Prev and Next Elements
        prevElement.style.height = `${newPrevHeight}px`

        if (newPrevHeight >= maxPrevHeight) {
            fullScreenSize()
        } else if (newPrevHeight < maxPrevHeight) {
            divider.style.display = "grid"
            nextElement.style.display = "flex"
        }
    }
    
    let showKeyboardContainer = document.querySelector("#showKeyboardBox")
    let showKeyboardButton = document.getElementById("showKeyboard")

    function fullScreenSize() {
        prevElement.style.height = "85vh"
        divider.style.display = "none"
        nextElement.style.display = "none"

        let scrollPosition = window.scrollY + window.innerHeight
        let pageHeight = document.documentElement.scrollHeight

        if (scrollPosition >= pageHeight - 10) {
            showKeyboardPopupBtn()
        } else {
            showKeyboardContainer.classList.add('hidden')
        }
        showKeyboardButton.addEventListener('click', () => {
            defaultSize()
        })
    }

    function showKeyboardPopupBtn() {
        showKeyboardContainer.classList.remove('hidden')
        showKeyboardContainer.style.height = "50px"
        showKeyboardButton.style.opacity = "0%"
        showKeyboardContainer.addEventListener('mouseover', function() {
            showKeyboardButton.style.opacity = "80%"
        })
        showKeyboardContainer.addEventListener('mouseleave', function() {
            showKeyboardButton.style.opacity = "0%"
        })
    }

    function defaultSize() {
        prevElement.style.height= "38vh"
        divider.style.display = "grid"
        nextElement.style.display = "flex"
        showKeyboardContainer.classList.add('hidden')      
    }

    const closeExampleBtn = document.querySelector('#closeExample')
    const exampleBox = document.querySelector('.example-box')
    closeExampleBtn.onclick = () => {
        exampleBox.classList.add('hidden')
        openExampleBtn.classList.remove('hidden')
    }
    const openExampleBtn = document.querySelector('#openExample')
    openExampleBtn.onclick = () => {
        exampleBox.classList.remove('hidden')
        openExampleBtn.classList.add('hidden')
    }

    const downloadKeyboardBtn = document.querySelector('#mobileDownloadIcon')
    window.onresize = () => visibleDownloadKeyboard()

    function visibleDownloadKeyboard() {
        const width = screen.width
        if (width <= 940) {
            downloadKeyboardBtn.classList.remove('hidden')
        } else {
            downloadKeyboardBtn.classList.add('hidden')
        }
    }

    const hideKeyboardBtn = document.getElementById('hideKeyboard')
    hideKeyboardBtn.onclick = () => fullScreenSize()

    resizer.addEventListener('mousedown', mouseDownHandler)
})