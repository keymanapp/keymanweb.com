document.addEventListener('DOMContentLoaded', function() {
    // Define the divider, text area and keyboard
    const container = document.querySelector('.container-flex')
    const divider = document.getElementById('Divider')

    const resizer = divider.querySelector('#resizeGrip')
    const prevElementOfResizer = divider.previousElementSibling.querySelector('.text-area')
    const nextElementOfResizer = divider.nextElementSibling
    
    let isResizing = false;
    
    let startY, startHeightTop, startHeightBottom = 0

    const mouseDownHandler = (e) => {
        e.preventDefault();
        resizer.style.cursor = 'grabbing'
        isResizing = true

        startY = e.clientY
        startHeightTop = prevElementOfResizer.offsetHeight
        startHeightBottom = nextElementOfResizer.offsetHeight

        document.addEventListener('mousemove', mouseMoveHandler)
        document.addEventListener('mouseup', mouseUpHandler)
    }

    const mouseUpHandler = () => {
        resizer.style.removeProperty('cursor')
        isResizing = false
        document.removeEventListener('mousemove', mouseMoveHandler)
    }

    const mouseMoveHandler = function (e) {
        if (!isResizing) return;

        let deltaY = e.clientY - startY   // Get up or down direction

        let newTopHeight = startHeightTop + deltaY
        let newBottomHeight = startHeightBottom - deltaY

        newTopHeight = Math.max(100, Math.min(newTopHeight, window.innerHeight * 0.8))
        newBottomHeight = Math.max(100, Math.min(newBottomHeight, window.innerHeight * 0.7))

        prevElementOfResizer.style.height = `${newTopHeight}px`
        nextElementOfResizer.style.height = `${newBottomHeight}px`

        if (newBottomHeight <= 200) {
            fullScreenSize()
        }
    }

    /* Hide-Show Keyboard */
    const hideKeyboardBtn = document.querySelector('#hideKeyboard')

    let isTextAreaFullHeight = false
    const fullHeightTextArea = window.innerHeight * 0.9
    const defaultHeightTextArea = window.innerHeight * 0.3

    function defaultSize() {
        prevElementOfResizer.style.height = `${defaultHeightTextArea}px`
        nextElementOfResizer.style.height = `500px`
        // nextElementOfResizer.style.width = `900px`
        isTextAreaFullHeight = false 
    }

    function fullScreenSize() {
        prevElementOfResizer.style.height = `${fullHeightTextArea}px`
        isTextAreaFullHeight = true
    }

    hideKeyboardBtn.addEventListener('click', () => {
        if (isTextAreaFullHeight) {
            defaultSize()
        } else {
            fullScreenSize()
        }
    })

    // Copy tool
    const copyBtn = document.querySelector('#copyTool')
    const textArea = document.querySelector('#textArea')
    copyBtn.addEventListener('click', async function() {
        try {
        let textToCopy = textArea.value.trim()

        if(!textToCopy) {
            copyBtn.classList.replace('fa-copy', 'fa-xmark')
            // copyBtn.textContent = ' No characters to copy'
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

    // Font slider
    const fontSliderBtn = document.querySelector('#fontSizeRange')
    fontSliderBtn.addEventListener('input', function() {
        textArea.style.fontSize = `${this.value}px`
    })

    defaultSize()
    
    resizer.addEventListener('mousedown', mouseDownHandler)
})