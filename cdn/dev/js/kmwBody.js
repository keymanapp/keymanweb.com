document.addEventListener('DOMContentLoaded', function() {
    // Define the divider, text area and keyboard
    const divider = document.getElementById('Divider')
    const resizer = divider.querySelector('.fa-arrows-up-down')
    let prevElement = divider.previousElementSibling.querySelector('.text-area');
    let nextElement = divider.nextElementSibling;
    let isResizing = false;
    
    // Define the heights of text area, keyboard, and the vertical screen
    let prevElementHeight = 0;
    let prevElementWidth = 0;
    let verticalViewport = 0;

    const mouseDownHandler = (e) => {
        e.preventDefault();
        resizer.style.cursor = 'grabbing'
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
        const maxPrevHeight = window.innerHeight * 0.8;
        const minNextWidth = 50;
        const maxNextWidth = 80;

        // Ensure the heights do need exceed the define heights
        newPrevHeight = Math.max(minPrevHeight, Math.min(newPrevHeight, maxPrevHeight));
        newNextWidth = Math.max(minNextWidth, Math.min(newNextWidth, maxNextWidth));

        // Update the heights of Prev and Next Elements
        prevElement.style.height = `${newPrevHeight}px`

        if (newPrevHeight >= maxPrevHeight) {
            fullScreenSize()
        } else if (newPrevHeight < maxPrevHeight) {
            divider.style.display = "grid"
            nextElement.style.display = "flex"
        }
    }

    /* Hide-Show Keyboard */
    const hideKeyboardBtn = document.querySelector('#hideKeyboard')

    let isTextAreaFullHeight = true
    const fullHeightTextArea = window.innerHeight * 0.9
    const defaultHeightTextArea = window.innerHeight * 0.3

    function defaultSize() {
        prevElement.style.height= `${defaultHeightTextArea}px`
        isTextAreaFullHeight = true     
    }

    function fullScreenSize() {
        prevElement.style.height = `${fullHeightTextArea}px`
        isTextAreaFullHeight = false
    }

    hideKeyboardBtn.addEventListener('click', () => {
        if (!isTextAreaFullHeight) {
            defaultSize()
        } else {
            fullScreenSize()
        }
    })

    const copyBtn = document.querySelector('#copyTool')
    const textArea = document.querySelector('#textArea')
    copyBtn.addEventListener('click', async function() {
        try {
            
        let textToCopy = textArea.value.trim()

        if(!textToCopy) {
            copyBtn.classList.replace('fa-copy', 'fa-xmark')
            copyBtn.textContent = ' No characters to copy'
            setTimeout(() => {
                copyBtn.classList.replace('fa-xmark', 'fa-copy')
                copyBtn.textContent = ''
            }, 3000)
            return;
        }

        await navigator.clipboard.writeText(textToCopy)

        copyBtn.classList.replace('fa-copy', 'fa-check');
        
        setTimeout(() => {
            copyBtn.classList.replace('fa-check', 'fa-copy');
        }, 1000);

        } catch (error) {
            console.error('Failed to copy: ', error)
        }
    })

    const fontSliderBtn = document.querySelector('#fontSizeRange')
    const fontSizeIndicator = document.querySelector('#fontSizeIndicator')
    fontSliderBtn.addEventListener('input', function() {
        textArea.style.fontSize = `${this.value}px`
        fontSizeIndicator.textContent = `${this.value}px`
    })
    defaultSize()
    resizer.addEventListener('mousedown', mouseDownHandler)
})