// UI for Search
import { searchState, selectedKbList } from "../state/appState.js";
import { highlightSearchContext, truncateDesc, getMarkedContext, showMarkedContext } from "../operation/searchCardContent.js";
import { addKbToSelectionMenu } from "./kb-selection-menu.js";
import { platformSupport } from "../operation/platformSupport.js";
import { validateURL } from "../operation/validURL.js";
import { setKeyboardToType } from "../operation/keyboard.js";
import { setKbHelpDocHamburger } from "../operation/selectedKb.js";
import { loadPageInfo } from "./pagination.js";

/* Search */
const kbSearchCard = document.getElementById('kbSearchCardUI')
const searchResultCount = document.getElementById('resultCount')
const paginationCtrl = document.getElementById('paginationControls')
const magnifying = document.querySelector('#magnifyingGlassIcon')

export function updateSearchIcon(value) {
    // Base on the value given, it will display one of the icon below
    magnifying.style.display = value ? 'none' : 'inline'
    clearSearchIcon.style.display = value ? 'inline' : 'none'
}

/* Display items return from search */
export function displaySearch(keyboards, total = 0, query = '') {
    const searchInstruction = document.querySelector('.search-instruction')
    const kbHrTitle = document.querySelector('.keyboard-title')

    kbSearchCard.innerHTML = '';

    // Validate the keyboards data
    if (!keyboards || keyboards.length == 0) {
        kbSearchCard.innerHTML = `<span class="loading">Well, no keyboards found for ${query}.</span>`
        searchInstruction.classList.add("hidden")
        kbHrTitle.textContent = "Results"
        paginationCtrl.style.display = 'none'
        return
    }
    
    if (total) {
        searchResultCount.innerHTML = `${total} results`
        searchResultCount.classList.remove('hidden')
    }
    
    // Getting searched Word ready for highlight
    const marked = getMarkedContext(query)

    if (!query) {
        // Most Download UI
        searchInstruction.classList.remove("hidden")
        kbHrTitle.textContent = "Most Downloads"
        paginationCtrl.style.display = 'none'
    } else if (total < 2) {
        // Total results < 2 UI
        searchInstruction.classList.add("hidden")
        kbHrTitle.textContent = "Results"
        paginationCtrl.style.display = 'none'
    } else {
        // Result of search query
        searchInstruction.classList.add("hidden")
        kbHrTitle.textContent = "Results"
        paginationCtrl.style.display = 'flex'
    }

    // UI for each keyboards
    keyboards.forEach(kb => {
        const card = searchKbCardUI(kb, marked, selectedKbList, keyboards)
        kbSearchCard.appendChild(card)
    })
}

// Search card UI
function searchKbCardUI(kb, marked = '', selectedKbList, data) {
    const searchInput = document.querySelector('#searchInput')
    const searchDropdown = new bootstrap.Dropdown(searchInput)
    const textArea = document.querySelector('#textArea')

    const kbFoundInList = selectedKbList.some(selected => selected.id == kb.id) // find a match between the keyboard from selection menu & search
    // Keyboard card container
    let cardWrap = document.createElement('div')
    cardWrap.classList.add('card-wrap')
    cardWrap.setAttribute('id', 'keyboardCardWrap')
    
    // Keyboard header container
    let cardHeader = document.createElement('div')
    cardHeader.classList.add('card-header')

    const {matchFound, matchField, matchValue} = highlightSearchContext(kb, marked) // Highlight search query

    const kbNameHeading = matchFound ? showMarkedContext(kb, matchField, matchValue) // Highlight search query UI
    : (() => {
        const heading = document.createElement('h4')
        heading.innerHTML = kb.name
        return heading
    })()
    
    // Keyboard Plus (+) icon
    const kbIconPTag = document.createElement('p')
    kbIconPTag.textContent = kbFoundInList ? "-" : "+"
    kbIconPTag.style.fontSize = '20px'
    kbIconPTag.style.cursor = 'pointer'
    kbIconPTag.classList.add('kb-icon-plus')

    // Keyboard Help (?) icon
    const kbHelpIconSpan = document.createElement('span')
    kbHelpIconSpan.classList.add('help-icon-span')
    const kbHelpIcon = document.createElement('i')
    kbHelpIcon.classList.add('fa-solid', 'fa-question')
    kbHelpIconSpan.appendChild(kbHelpIcon)

    const kbHeaderTitle = document.createElement('div')
    kbHeaderTitle.classList.add('card-header-title')

    // Must check if the keyboard is in the selection menu
    checkKbCardUI(kbIconPTag, cardHeader, kb)

    // Keyboard ID
    const kbIdPTag = document.createElement('p')
    kbIdPTag.classList.add('keyboard-id')
    kbIdPTag.textContent = kb.id

    // Keyboard Description
    const kbDescHeading = truncateDesc(kb, matchField, marked)

    // Keyboard monthly downloads and platform support
    const kbSpecs = document.createElement('div')
    kbSpecs.classList.add('keyboard-specs')

    const kbDownloadHeading = document.createElement('h6')
    kbDownloadHeading.textContent = `${kb.match.downloads} monthly downloads`
    kbDownloadHeading.classList.add('monthly-download')

    const kbPlatformSupport = document.createElement('div')
    kbPlatformSupport.classList.add('platform')
    kbPlatformSupport.innerHTML = platformSupport(kb.platformSupport) // Get icons for platform

    // Append children
    kbHeaderTitle.appendChild(kbIconPTag)
    kbHeaderTitle.appendChild(kbNameHeading)
    cardHeader.appendChild(kbHeaderTitle)
    cardHeader.appendChild(kbHelpIconSpan)

    kbSpecs.appendChild(kbDownloadHeading)
    kbSpecs.appendChild(kbPlatformSupport)

    cardWrap.appendChild(cardHeader)
    cardWrap.appendChild(kbIdPTag)
    cardWrap.appendChild(kbDescHeading)
    cardWrap.appendChild(kbSpecs)

    // Click on a keyboard name to enable the keyboard & add it into selection menu
    kbHeaderTitle.onclick = (e) => {
        e.stopPropagation()
        addKbToSelectionMenu(kbIconPTag, cardHeader, kb, data)
        setKeyboardToType()
        setKbHelpDocHamburger(kb.id, kb.name)
        searchDropdown.hide()
        textArea.focus()
    }

    // Click on the help icon on the search card to get to the keyboard help documentation
    kbHelpIcon.addEventListener('click', () => {
        const checkedURL = validateURL(`https://help.keyman.com/keyboard/`)
        const newURL = checkedURL + kb.id
        window.open(newURL, '_blank')
    })

    return cardWrap
}

// Disable or Enable UI with opacity
export function checkKbCardUI(kbIconPTag, element, kb) {
    // For checking if the keyboard exists in to respond to UI
    let kbFoundInList = selectedKbList.some(selected => selected.id == kb.id)
    
    if (kbFoundInList) {
        element.style.opacity = '50%'
    } else {
        element.style.opacity = '100%'
    }
}