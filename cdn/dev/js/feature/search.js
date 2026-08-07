/*
 * Keyman is copyright (C) SIL Global. MIT License.
 * 
 * Created by MengHeng Hav on 2026-06-26
 * 
 * Element and interactions for Search
 */
import { searchState, selectedKbList } from "../state/appState.js";
import { highlightSearchContext, truncateDesc, getMarkedContext, showMarkedContext } from "../operation/searchCardContent.js";
import { kbContainerUI, reorderSelectedKbList } from "./kb-container.js";
import { validateURL } from "../operation/validURL.js";
import { setKeyboardToType } from "../operation/keyboard.js";
import { setKbHelpDocHamburger } from "../operation/hamburgerMenu.js";
import { getTotalPage } from "./pagination.js";
import { storeInKbContainer, kbDataForKbContainer } from "../operation/keyboardContainer.js";
import { setKeyboard } from "../operation/keyboardDataPackage.js";

/* Search */
const kbSearchCard = document.getElementById('kbSearchCardUI')
const searchResultCount = document.getElementById('resultCount')
const paginationCtrl = document.getElementById('paginationControls')
const magnifying = document.querySelector('#magnifyingGlassIcon')

// Search icon changes depending on the value
export function updateSearchIcon(searchQuery) {
    // Base on the value given, it will display one of the icons below
    magnifying.style.display = searchQuery ? 'none' : 'inline'
    clearSearchIcon.style.display = searchQuery ? 'inline' : 'none'
}

/* 
    Only called when there is a query search
    Display items return from search
*/
export function displaySearch(listOfKbData, amountOfKb = 0, searchQuery = '') {
    // Ensure Keyboard Search UI is empty
    kbSearchCard.innerHTML = '';

    const kbHrTitle = document.querySelector('.keyboard-title')
    // Validate the keyboards data
    if (!listOfKbData || listOfKbData.length == 0) {
        kbSearchCard.innerHTML = `<span class="loading">No keyboards found for ${searchQuery}.</span>`
        kbHrTitle.textContent = "Results"
        paginationCtrl.style.display = 'none'
        return
    }
    
    if (amountOfKb) {
        searchResultCount.innerHTML = `${amountOfKb} results`
        searchResultCount.classList.remove('hidden')
    }
    
    // Getting searched Word ready for highlight
    const markedSearchText = getMarkedContext(searchQuery)

    if (!searchQuery) {
        // Most Download UI
        kbHrTitle.textContent = "Most Downloads"
        paginationCtrl.style.display = 'none'
    } else if (amountOfKb < 2) {
        // Total results < 2 UI
        kbHrTitle.textContent = "Results"
        paginationCtrl.style.display = 'none'
    } else {
        // Result of search query
        kbHrTitle.textContent = "Results"
        paginationCtrl.style.display = 'flex'
    }

    // Display each keyboards into the card UI
    listOfKbData.forEach(eachKb => {
        const card = searchMenu(eachKb, markedSearchText, selectedKbList, listOfKbData)
        kbSearchCard.appendChild(card)
    })
}

// Search card UI
function searchMenu(eachKb, markedSearchText = '', selectedKbList, listOfKbData) {
    const searchInput = document.querySelector('#searchInput')
    const searchDropdown = new bootstrap.Dropdown(searchInput)
    const textArea = document.querySelector('#textArea')

    const kbFoundInList = selectedKbList.some(selected => selected.id == eachKb.id) // find a match between the keyboard from selection menu & search
    // Keyboard card container
    let cardWrap = document.createElement('div')
    cardWrap.classList.add('card-wrap')
    cardWrap.setAttribute('id', 'keyboardCardWrap')
    
    // Keyboard header container
    let cardHeader = document.createElement('div')
    cardHeader.classList.add('card-header')

    const {matchFound, matchField, matchValue} = highlightSearchContext(eachKb, markedSearchText) // Highlight search query

    const kbNameHeading = matchFound ? showMarkedContext(eachKb, matchField, matchValue) // Highlight search query UI
    : (() => {
        const heading = document.createElement('h4')
        heading.innerHTML = eachKb.name
        return heading
    })()

    // Keyboard Help (?) icon
    const kbIconDiv = document.createElement('div')
    kbIconDiv.classList.add('card-header-icon')

    const kbHelpIcon = document.createElement('i')
    kbHelpIcon.classList.add('fa-solid', 'fa-question')
    kbHelpIcon.setAttribute('id', 'kbHelpIcon')
    kbIconDiv.appendChild(kbHelpIcon)

    const kbDownloadIcon = document.createElement('i')
    kbDownloadIcon.classList.add('fa-solid', 'fa-download')
    kbDownloadIcon.setAttribute('id', 'kbDownloadIcon')
    kbIconDiv.appendChild(kbDownloadIcon)

    // Keyboard Header
    const kbHeaderTitle = document.createElement('div')
    kbHeaderTitle.classList.add('card-header-title')

    const kbSubHeader = document.createElement('div')
    kbSubHeader.classList.add('card-sub-header')

    // Keyboard ID
    const kbIdPTag = document.createElement('p')
    kbIdPTag.classList.add('keyboard-id')
    kbIdPTag.textContent = eachKb.id

    // Dot for spacing
    const kbDot = document.createElement('div')
    kbDot.classList.add('dot-spacing')

    // Keyboard Monthly Downloads
    const kbDownloadHeading = document.createElement('p')
    kbDownloadHeading.textContent = `${eachKb.match.downloads} monthly downloads`
    kbDownloadHeading.classList.add('monthly-download')

    // Keyboard Description
    const kbDescHeading = truncateDesc(eachKb, matchField, markedSearchText)

    // Keyboard Selection Indicator
    const kbSelectionIndic = document.createElement('div')
    kbSelectionIndic.classList.add('selection-indicator')

    const kbTickIcon = document.createElement('i')
    kbTickIcon.classList.add('fa-solid', 'fa-check')

    kbSelectionIndic.appendChild(kbTickIcon)

    // Append children
    kbHeaderTitle.appendChild(kbNameHeading)
    cardHeader.appendChild(kbHeaderTitle)
    cardHeader.appendChild(kbIconDiv)

    kbSubHeader.appendChild(kbIdPTag)
    kbSubHeader.appendChild(kbDot)
    kbSubHeader.appendChild(kbDownloadHeading)

    cardWrap.appendChild(cardHeader)
    cardWrap.appendChild(kbSubHeader)
    cardWrap.appendChild(kbDescHeading)
    cardWrap.appendChild(kbSelectionIndic)

    // Must check if the keyboard is in the selection menu
    checkSearchCardStatus([cardWrap, kbSelectionIndic], eachKb)
    
    // Click on a keyboard name to enable the keyboard & add it into selection menu
    cardWrap.onclick = () => {
        const langCode = Object.keys(eachKb.languages)[0] || "en"
        storeInKbContainer(cardHeader, eachKb, listOfKbData)
        setKbHelpDocHamburger(eachKb.id, eachKb.name)
        setKeyboard(eachKb.id, langCode, eachKb.name)
        reorderSelectedKbList(eachKb.id)
        setKeyboardToType()
        // Must check if the keyboard is in the selection menu
        checkSearchCardStatus([cardWrap, kbSelectionIndic], eachKb)
    }

    // Click on the help icon on the search card to get to the keyboard help documentation
    kbHelpIcon.addEventListener('click', (e) => {
        e.stopPropagation()
        const checkedURL = validateURL(`https://help.keyman.com/keyboard/`)
        const newURL = checkedURL + eachKb.id
        window.open(newURL, '_blank')
    })

    kbDownloadIcon.addEventListener('click', (e) => {
        e.stopPropagation()
        const checkedURL = validateURL(`https://keyman.com/keyboards/install/`)
        const newURL = checkedURL + eachKb.id
        window.open(newURL, '_blank')
    })

    return cardWrap
}

// Disable or Enable Search UI
export function checkSearchCardStatus(elements, kb) {
    let kbFoundInList = selectedKbList.some(selected => selected.id == kb.id)
    const selectIndicator = document.querySelector('.selection-indicator')
    const kbCardWrap = document.querySelector('.card-wrap')

    Object.values(elements).forEach(ele => {
        ele?.classList.toggle('selected', kbFoundInList)
    })
}