document.addEventListener('DOMContentLoaded', function() {
    // Define the divider, text area and keyboard
    const divider = document.getElementById('Divider')
    const resizer = divider.querySelector('.fa-bars')
    let prevElement = divider.previousElementSibling.querySelector('.textarea');
    let nextElement = divider.nextElementSibling;
    
    // Define the heights of text area, keyboard, and the vertical screen
    let prevElementHeight = 0;
    let nextElementHeight = 0;
    let nextElementWidth = 0;
    let verticalViewport = 0;

    const mouseDownHandler = (e) => {
        e.preventDefault();
        // Get the Y coordinate of mouse click & Text Area + Keyboard heights
        prevElementHeight = prevElement.getBoundingClientRect().height;
        nextElementHeight = nextElement.getBoundingClientRect().height;
        nextElementWidth = nextElement.getBoundingClientRect().width;
        verticalViewport = e.clientY;

        document.addEventListener('mousemove', mouseMoveHandler)
        document.addEventListener('mouseup', mouseUpHandler)

        resizer.style.cursor = 'ns-resize'
        document.body.style.cursor = 'ns-resize'
    }

    const mouseUpHandler = () => {
        resizer.style.removeProperty('cursor')
        document.body.style.removeProperty('cursor');

        prevElement.style.removeProperty('user-select')
        prevElement.style.removeProperty('pointer-events')

        nextElement.style.removeProperty('user-select')
        nextElement.style.removeProperty('pointer-events')

        // Remove the handlers of mousemove and mouseup
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
    }

    const mouseMoveHandler = function (e) {
        // Calculate the cursor movement
        let value = e.clientY - verticalViewport
        calcElementSize(value)
    }

    function calcElementSize(val) {
        // Get the dynamic heights of both elements
        let newPrevHeight = prevElementHeight + val;
        let newNextHeight = nextElementHeight - val;
        let newNextWidth = nextElementWidth - val;

        let keyboardElements = divider.nextElementSibling.querySelectorAll('.keyboard-and-download')
        
        // Define minimum and maximum heights
        const minPrevHeight = 200;
        const maxPrevHeight = window.innerHeight * 0.8;
        const minNextHeight = 200;
        const maxNextHeight = 800;
        const minNextWidth = 10;
        const maxNextWidth = 100;

        // Ensure the heights do need exceed the define heights
        newPrevHeight = Math.max(minPrevHeight, Math.min(newPrevHeight, maxPrevHeight));
        newNextHeight = Math.max(minNextHeight, Math.min(newNextHeight, maxNextHeight));
        newNextWidth = Math.max(minNextWidth, Math.min(newNextWidth, maxNextWidth));

        // Update the heights of Prev and Next Elements
        prevElement.style.height = `${newPrevHeight}px`;
        if (newPrevHeight >= maxPrevHeight) {
            fullScreenSize()
        } 
        else {
            keyboardElements.forEach(element => {
                element.style.height = `${newNextHeight}px`;
                element.style.width = `${newNextWidth}%`
            })
            divider.style.display = "flex"
            nextElement.style.display = 'flex';
        }
    }
    
    let showKeyboardContainer = document.querySelector(".show-keyboard-box")
    let showKeyboardButton = document.querySelector(".show-keyboard")

    function defaultSize() {
        prevElement.style.height= "45vh"
        divider.style.display = "flex"
        nextElement.style.display = "flex" 
        showKeyboardContainer.classList.add('hidden')      
    }

    function fullScreenSize() {
        nextElement.style.display = "none"
        divider.style.display = "none"
        prevElement.style.height = '88vh'

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

    const hideKeyboardBtn = document.getElementById('hideKeyboard')
    hideKeyboardBtn.onclick = () => fullScreenSize()

    resizer.addEventListener('mousedown', mouseDownHandler)
})