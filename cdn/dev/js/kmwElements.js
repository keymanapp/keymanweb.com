const calcScreenSize = Math.min(screen.width, screen.height) > 720 ? 'tablet' : 'mobile'

const searchBox = document.getElementById('searchInput')
const fontSizeContainer = document.getElementsByClassName('font-size-container')
const kbSelectionBtn = document.getElementById('keyboardSelectionButton')
const searchIcon = document.getElementById('searchIcons')

const fontSizeElements = `
            <div class="mobile-font-size-container item">
                <span class="font-small item">A</span>
                <input id="fontSizeRange" type="range" name="" value="16" min="12" max="132" step="2"></input>
                <span class="font-large item">A</span>
            </div>`

if (calcScreenSize == 'tablet') {
    
} 

if (calcScreenSize == 'mobile') {
    const firstChild = fontSizeContainer[0].children[0]
    const secondChild = fontSizeContainer[0].children[1]
    firstChild.remove()
    secondChild.remove()
    
    searchBox.addEventListener('click', () => {
        kbSelectionBtn.style.display = 'none'
        searchIcon.style.left = '200px'
    })
}

const fontSizeChild = fontSizeContainer[0].children[0]
fontSizeChild.addEventListener('click', () => {
    fontSizeChild.innerHTML = fontSizeElements
})


