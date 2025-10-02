keyman = getKeymanWeb()

function getKeymanWeb() {
    if(window.tavultesoft) {
      return window.tavultesoft.keymanweb;
    }
    return window.keyman;
}
/* Global Variables */
let selectedKbList = []         // Main array for the search, kb selection...etc.
let kbSearchData = []       // For History search
let kmwLang = keyman.getActiveLanguage()
let kmwKb = keyman.getActiveKeyboard()

const clearSearchIcon = document.querySelector('#clearSearchIcon')
const magnifying = document.querySelector('#magnifyingGlassIcon')

const elements = {
    worldMapBtn: document.querySelector('#worldMap'),
    kmwControls: document.querySelector('#KeymanWebControl'),

    kbSelection: document.querySelector('#keyboardSelection'),
    keyboardSelectionButton: document.querySelector('#keyboardSelectionButton'),
    caretRightIcon: keyboardSelectionButton.querySelector('.fa-caret-right'),

    searchBar: document.querySelector('#searchBar'),
    searchInput: document.querySelector('#searchInput'),
    searchDropdownMenu: document.querySelector('#searchDropdownMenu'),
    searchIcons: document.querySelector('#searchIcons'),
}

const state = {
    mapIsOpen: false
}

/* 
        ===================================== Default keyboard =========================================
*/

function defaultKeyboard(kbdname = "basic_kbdus", languageCode = "en") {
    if(!exists(kbdname, languageCode)) {
        if (textArea) textArea.placeholder = 'A Keyboard name isn\'t specified. Select a keyboard and start typing'
        return
    }
    setKeyboardWithDirection(kbdname, languageCode)
}

/*
        ============================= Toggle between World Map and Search ==============================
*/
elements.worldMapBtn?.addEventListener('click', (e) => {
    e.preventDefault()
    state.mapIsOpen = true
    if (state.mapIsOpen == true) {
        openMap()
        keyman.addEventListener('keyboardchange', () => {
            location.replace(`#${keyman.getActiveLanguage()},${keyman.getActiveKeyboard()}`)
            updateExample(keyman.getActiveKeyboard())
            setTimeout(() => {
                applyClassToKb(), 0
            })
        }) 
    } else {
        openSearch()
    }
})

function openSearch() {
    state.mapIsOpen = false
    hideEls(
        elements.kmwControls,
    )
    showEls(
        elements.searchDropdownMenu,
        elements.searchIcons
    )

    if (selectedKbList.length > 0) {
        elements.caretRightIcon.textContent = selectedKbList.length
        removeClass(elements.caretRightIcon, 'fa-magnifying-glass')
    } else {
        elements.caretRightIcon.textContent = ''
        elements.caretRightIcon.classList.add('fa-caret-right')
    }
    
    elements.searchBar.replaceChildren(
        elements.searchInput,
        elements.searchIcons,
        elements.searchDropdownMenu
    )
}

function openMap() {
    state.mapIsOpen = true
    removeClass(
        elements.kmwControls, 'hidden',
        elements.caretRightIcon, 'fa-caret-right'
    )
    hideEls(
        elements.searchDropdownMenu
    )
    removeTextContent(
        elements.caretRightIcon
    )
    elements.keyboardSelectionButton.removeAttribute('id', 'keyboardSelectionButton')
    elements.keyboardSelectionButton.setAttribute('id', 'returnToSearchButton')
    elements.caretRightIcon.classList.add('fa-magnifying-glass')
    elements.keyboardSelectionButton.style.backgroundColor = "var(--keyman-orange)"
    elements.keyboardSelectionButton.style.border = '0px'
    elements.keyboardSelectionButton.classList.add('return-to-search')
    elements.kbSelection.style.display = "none"
    elements.searchBar.replaceChildren(
        elements.kmwControls
    )
}

function returnToSearch() {
    elements.keyboardSelectionButton.removeAttribute('id', 'returnToSearchButton')
    elements.keyboardSelectionButton.setAttribute('id', 'keyboardSelectionButton')
    
    if ((selectedKbList?.length || 0) < 1) {
        elements.caretRightIcon.classList.add('fa-caret-right')
        removeClass(elements.caretRightIcon, 'fa-magnifying-glass')
        elements.caretRightIcon.textContent = ''
    }

    elements.keyboardSelectionButton.style.backgroundColor = ""
    elements.kbSelection.style.display = "block"
    openSearch()
}

function waitForElement(selector) {
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

waitForElement('#returnToSearchButton').then((element) => {
    element.addEventListener('click', (e) => {
        e.preventDefault()
        returnToSearch()
    })
})

waitForElement(".kmw-osk-frame").then((oskDiv) => {
    document.querySelector('.keyboard-area').appendChild(oskDiv)
})

/* 
              ==================== Search Interaction ===================
*/

/* Search Input */
const dropdown = new bootstrap.Dropdown(elements.searchInput, {
    autoClose: 'outside'
})

document.addEventListener('click', (e) => {
    if (!elements.searchInput.contains(e.target) && !elements.searchDropdownMenu.contains(e.target)) {
        dropdown.hide()
    }
})

elements.searchInput.addEventListener('click', (e) => {
    e.stopPropagation()
    // defaultKeyboard()
    dropdown.show()
})

// Hide Dropdown Search on Mouse leave
elements.searchDropdownMenu.addEventListener('mouseleave', (e) => {
    e.preventDefault()
    dropdown.hide()
})

/* 
    =========================== Utility functions ============================
*/
function hideEls(...elements) {
    return elements.every(el => el.classList.add('hidden'))
}

function showEls(...elements) {
    return elements.every(el => el.classList.remove('hidden'))
}

function removeClass(element, className) {
    return element.classList.remove(className)
}

function removeTextContent(...elements) {
    return elements.every(el => el.textContent = '')
}

/* Elements validation */
function exists(...elements) {
    return elements.every(el => el != null)
}

document.addEventListener('DOMContentLoaded', () => {
    /*  UI Behavior of the Selected Keyboard menu */
    if (exists(elements)) {
        elements.keyboardSelectionButton.addEventListener('mouseenter', () => {
            elements.kbSelection.classList.add('open')
        })
        elements.keyboardSelectionButton.addEventListener('click', () => {
            elements.kbSelection.classList.remove('open')
        })
        elements.kbSelection.addEventListener('mouseleave', () => {
            elements.kbSelection.classList.remove('open')
        })
    }
})

/*
    === Keyboard Execution ===
*/
const downloadBtn = document.getElementById('kbDownloadPage')
const textArea = document.getElementById('textArea')
let langExamples = [];

function selectKb(kbdname, languageCode) {
    if(!exists(kbdname, languageCode)) {
        if (textArea) textArea.placeholder = 'A Keyboard name isn\'t specified. Select a keyboard and start typing'
        return
    }
    setKeyboardWithDirection(kbdname, languageCode)
}

function setTextDirection(targetEls, dir) {
    const copyBtn = document.querySelector('#copyTool')

    targetEls.dir = dir
    if (dir == 'rtl') {
        copyBtn.style.right = '0'
        copyBtn.style.left = '10px'
    } else {
        copyBtn.style.right = ''
        copyBtn.style.left = ''
    }
}

// Change and type keyboard
async function setKeyboardWithDirection(kbdname, languageCode) {
    const kbSpan = document.querySelector('#kbSpan')
    const langTag = `#${languageCode}`
    let kbTag = ''

    if (kbdname.match(/Keyboard_*/)) {
        kbTag = `${kbdname}`  
    } else {
        kbTag = `Keyboard_${kbdname}` 
    }

    location.replace(`${langTag},${kbTag}`)
    await keyman.addKeyboards(kbdname)
    const kbd = keyman.getKeyboard(kbdname, languageCode)
    await keyman.setActiveKeyboard(kbdname, languageCode)
    
    // setTimeout(() => {
    //     applyClassToKb(), 0
    // })

    if(kbd) {
        textArea.placeholder = `The ${kbdname} keyboard is selected. Start typing...`
        kbSpan.innerHTML = `${kbdname}`

        setTextDirection(textArea, textArea.dir)
    }
    updateExample(kbdname)
    if(typeof(KeyboardChange_EmbedFonts) != 'undefined') KeyboardChange_EmbedFonts(kbdname)
}

/* Language Examples AJAX */
async function updateExample(kbdname) {
    const keymanExample = document.getElementById("example")
    const exampleBox = document.getElementById("exampleBox")
    
    if (!keymanExample || !exampleBox) return false;

    if(kbdname == '')
    {
        keymanExample.textContent = `No example is available due to empty Keyboard name.`
        return true;
    }

    let activeLanguage = keyman.getActiveLanguage();

    if(langExamples[activeLanguage + '_' + kbdname])
    {
        keymanExample.innerHTML = langExamples[activeLanguage + '_' + kbdname];
        return true;
    }
    
    langExamples[activeLanguage + '_' + kbdname] = 'Loading...';
    keymanExample.innerHTML = 'Loading...';

    const link = `/prog/languageexample.php?keyboard=${kbdname}&language=${activeLanguage}`;
    try {
        const response = await fetch(link);
        if(response.status == 200) {
            const content = await response.text();
            
            langExamples[activeLanguage + '_' + kbdname] = keymanExample.innerHTML = content;
        } else {
            throw new Error(`Unable to retrieve content, status was ${response.status}: ${response.statusText}`);
        }
    } catch(e) {
        langExamples[activeLanguage + '_' + kbdname] = keymanExample.innerHTML = 'Error retrieving example: '+e.message;
        throw e;
    }
}

function applyClassToKb() {
    
    const kbArea = document.querySelector('.keyboard-area')
    if (!kbArea) return

    const apply = () => {
        const child = kbArea.children
        for (const c of child) {
            if (!c.classList.contains('kmw-osk-frame')) {
                c.classList.add('kmw-osk-frame')
                c.classList.add('kmw-help-osk-frame')
            }
        }
    }

    apply()

    // const observer = new MutationObserver(() => {
    //     for (const m of mutations) {
    //         if (m.type === 'childlist' && m.addedNodes.length) {
    //             apply()
    //         }
    //     }
    // })
    // observer.observe(kbArea, {childList: true})
}

/* Search */
const kbSearchCard = document.getElementById('kbSearchCardUI');
let debounceTimer

/* Pagination */
prevBtn = document.getElementById('prevPage')
nextBtn = document.getElementById('nextPage')
pageInfo = document.getElementById('pageInfo')

searchResultCount = document.getElementById('resultCount')
paginationCtrl = document.getElementById('paginationControls')

let currentPage = 1
let currentQuery = ''
let totalPage
const itemPerPage = 10

prevBtn.addEventListener('click', goPrevPage)
nextBtn.addEventListener('click', goNextPage)

function updatePaginationCtrl() {
    pageInfo.textContent = `${currentPage} of ${totalPage}`
    nextBtn.disabled = currentPage >= totalPage
    prevBtn.disabled = currentPage <= 1
}

function goPrevPage() {
    if (currentPage > 1) {
        currentPage--
        searchKeyboard(currentQuery, currentPage)
    }
}

function goNextPage() {
    if (currentPage < totalPage) {
        currentPage++
        searchKeyboard(currentQuery, currentPage)
    }
}

/* Click: Open Search and Display search instructions */
elements.searchInput.addEventListener('click', function(e) {
    const query = e.target.value.trim()
    
    defaultKeyboard()
    if (query == "") {
        resetSearch()
    } else {
        searchKeyboard(query)
    }
})

/* Input: Search and Display keyboards */
elements.searchInput.addEventListener('input', function(e) {
    handleSearch(e.target.value)
})

clearSearchIcon.addEventListener('click', () => {
    elements.searchInput.value = ''
    handleSearch()
    elements.searchInput.focus()
})

function handleSearch(value = "") {
    currentQuery = value.trim()
    currentPage = 1
    
    updateSearchIcon(value)

    if (!currentQuery) {
        resetSearch()
        return
    }
    debounceSearch(currentQuery, currentPage)
}

function resetSearch() {
    paginationCtrl.style.display = 'none'
    defaultSearch()
}

function updateSearchIcon(value) {
    const hasValue = value.length > 0
    magnifying.style.display = hasValue ? 'none' : 'inline'
    clearSearchIcon.style.display = hasValue ? 'inline' : 'none'
}

function debounceSearch(query, page) {
    clearTimeout(debounceTimer)
    if (query.length > 1) {
        debounceTimer = setTimeout(() => {
            searchKeyboard(query, page)
        }, 300)
    }
}

/*      == Section ==
            Search 
*/

/* Display top downloads with search Instruction */
async function defaultSearch() {
    kbSearchCard.innerHTML = `<p>Loading...</p>`
    try {
        let response = await fetch(`https://api.keyman.com/search/2.0?q=p:popular`)
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`)
        }

        let data = await response.json()

        let mostDownloadkb = data.keyboards

        if (!mostDownloadkb || !Array.isArray(mostDownloadkb)) {
            throw new Error(`Invalid API response structure`)
        }
        displaySearch(mostDownloadkb)
    } 
    catch(error) {
        console.error(`Error fetching ${error}`)
        kbSearchCard.innerHTML = `<div>No keyboards are found.</div>`
        paginationCtrl.style.display = 'none'
    }
}

/* Get query and return search */
async function searchKeyboard(query = null, page) {
    kbSearchCard.innerHTML = `<div>Searching ${query}...</div>`
    kbSearchCard.style.display = 'block'
    
    let response = await fetch(`https://api.keyman.com/search/2.0?q=${encodeURIComponent(query)}&p=${page}`)
    if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`)
    }

    searchHistory(query)
    let data = await response.json()
    // Found with Context: Setup pagination
    if (data.context) {
        totalPage = data.context.totalPages || 1;
        currentPage = data.context.pageNumber || 1;
    } else {
        totalPage = Math.ceil(data.keyboards.length / itemPerPage);
    }

    // Validate data.keyboards
    let keyboardData = data.keyboards
    if (!keyboardData || !Array.isArray(keyboardData)) {
        throw new Error("Invalid API response structure")
    }

    // Get total result
    let totalFound = data.context.totalRows
    
    updatePaginationCtrl()
    displaySearch(keyboardData, totalFound, query)
}

/* Display items return from search */
function displaySearch(data, total = 0, query = '') { 
    kbSearchCard.innerHTML = '';

    if (!data || data.length == 0) {
        kbSearchCard.innerHTML = '<span class="loading">No keyboards are found.</span>'
        paginationCtrl.style.display = 'none'
        return
    }

    if (total) {
        searchResultCount.innerHTML = `${total} results`
        searchResultCount.classList.remove('hidden')
    }
    
    // Getting searched Word ready for highlight
    const marked = getMarkedContext(query)

    const searchInstruction = document.querySelector('.search-instruction')
    const kbHrTitle = document.querySelector('.keyboard-title')
    if (!query) {
        searchInstruction.classList.remove("hidden")
        kbHrTitle.textContent = "Most Downloads"
    } else {
        searchInstruction.classList.add("hidden")
        kbHrTitle.textContent = ""
    }
    data.forEach(kb => {
        const card = searchKbCardUI(kb, marked, selectedKbList, data)
        kbSearchCard.appendChild(card)
    })
    paginationCtrl.style.display = 'flex';
}

// UI Search card
function searchKbCardUI(kb, marked = '', selectedKbList, data) {
    const kbFoundInList = selectedKbList.some(selected => selected.id == kb.id)
    // Keyboard card container
    let cardWrap = document.createElement('div')
    cardWrap.classList.add('card-wrap')
    cardWrap.setAttribute('id', 'keyboardCardWrap')
    
    // Keyboard header container
    let cardHeader = document.createElement('div')
    cardHeader.classList.add('card-header')

    const {matchFound, matchField, matchValue} = highlightSearchContext(kb, marked)

    const kbNameHeading = matchFound ? showMarkedContext(kb, matchField, matchValue) 
    : (() => {
        const heading = document.createElement('h4')
        heading.innerHTML = kb.name
        return heading
    })
    
    // Keyboard Plus (+) icon
    const kbIconPTag = document.createElement('p')
    kbIconPTag.textContent = kbFoundInList ? "-" : "+"
    kbIconPTag.style.fontSize = '20px'
    kbIconPTag.style.cursor = 'pointer'
    kbIconPTag.classList.add('kb-icon-plus')

    checkKbCardUI(kbIconPTag, cardWrap, kb)
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
    kbPlatformSupport.innerHTML = platformSupport(kb.platformSupport)

    // Append children
    cardHeader.appendChild(kbNameHeading)
    cardHeader.appendChild(kbIconPTag)

    kbSpecs.appendChild(kbDownloadHeading)
    kbSpecs.appendChild(kbPlatformSupport)

    cardWrap.appendChild(cardHeader)
    cardWrap.appendChild(kbIdPTag)
    cardWrap.appendChild(kbDescHeading)
    cardWrap.appendChild(kbSpecs)

    // Choose keyboard to selection
    kbIconPTag.onclick = (e) => {
        e.stopPropagation()
        addKbToSelectionMenu(kbIconPTag, cardWrap, kb, data)
        textArea.focus()
        selectKb()
    }
    // console.log("Recent:", historyKbSelection.getHistory());
    
    return cardWrap
}

// Disable or Enable search card
function checkKbCardUI(kbIconPTag, cardWrap, kb) {
    // For checking if the keyboard exists in selected Kbs
    let kbFoundInList = selectedKbList.some(selected => selected.id == kb.id)
    if (kbFoundInList) {
        cardWrap.classList.add('disabled')
    } else {
        cardWrap.classList.remove('disabled')
    }
}

// Highlight word searched
function getMarkedContext(query) {
    let escapedTerm = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    return new RegExp(escapedTerm, 'i')
}

// Find a match between Search Context and Language, Keyboard name, Description
function highlightSearchContext(kb, marked) {
    let matchFound = false
    let matchField = ""
    let matchValue = ""

    // Get and find language that matches the search
    for (lang in kb.languages) {
        let langData = kb.languages[lang]
        for (key in langData) {
            const value = langData[key]
            if (typeof value == "string" && marked.test(value)) {
                matchFound = true
                matchValue = value.replace(marked, (m) => m ? `<mark>${m}</mark>` : m)
                matchField = "language"
                break
            }
        }
        if (matchFound) break
    }

    // Find a match for keyboard name if language is not a match
    if (!matchFound && marked.test(kb.name)) {
        matchFound = true
        matchValue = kb.name.replace(marked, '<mark>$&</mark>')
        matchField = "keyboard"
    }

    // Find a match for keyboard description if name is not a match
    if (!matchFound && marked.test(kb.description)) {
        matchFound = true
        matchField = "description"
    }

    return {matchField, matchValue, matchFound}
}

// Display Highlighted Search Context
function showMarkedContext(kb, matchField, matchValue) {
    const kbNameHeading = document.createElement('h4')

    const kbHelpLink = document.createElement('a')
    kbHelpLink.href = `https://help.keyman.com/keyboard/${kb.id}`
    kbHelpLink.target = '_blank'
    kbHelpLink.rel = 'noopener noreferrer'

    // Display matched language
    const langNameSpan = document.createElement('span')
    langNameSpan.style.fontSize = "14px"
    if (matchField == "language") {
        langNameSpan.innerHTML = matchField == "language" ? ` (${matchValue} language)` : ""
    }

    // Display matched keyboard
    if (matchField == "keyboard") {
        kbHelpLink.innerHTML = matchValue
    } else {
        kbHelpLink.textContent =  kb.name
    }
    kbNameHeading.appendChild(kbHelpLink)
    kbNameHeading.appendChild(langNameSpan)
    kbNameHeading.addEventListener('click', () => {
        const checkedURL = validateURL(`https://help.keyman.com/keyboard/`)
        const newURL = checkedURL + kb.id
        window.open(newURL, '_blank')
    })

    return kbNameHeading
}

// Truncated Keyboard Description
function truncateDesc(kb, matchField, marked) {
    const kbDescHeading = document.createElement('h6')
    kbDescHeading.classList.add("keyboard-description")
    const word_limits = 90

    let temp = document.createElement('div')
    temp.innerHTML = kb.description

    let fullDesc = kb.description
    let plainText = temp.textContent
    let shortText = ""

    let isTruncated = false

    if (plainText.length >= word_limits) {
        shortText = plainText.slice(0, word_limits) + "..."
        kbDescHeading.innerHTML = shortText
        isTruncated = true  
    } else {
        kbDescHeading.innerHTML = fullDesc
        isTruncated = false
    }

    if (isTruncated) {
        const toggleBtn = document.createElement('a')
        toggleBtn.href = "#"
        toggleBtn.style.marginLeft = "6px"
        toggleBtn.textContent = "Show more"

        toggleBtn.addEventListener('click', e => {
            e.preventDefault()
            const isExpanded = toggleBtn.textContent == "Show more"
            kbDescHeading.innerHTML = !isExpanded ? shortText.replace(marked, (m) => m ? `<mark>${m}</mark>` : m) : fullDesc
            if (matchField == 'description') {
                kbDescHeading.innerHTML = isExpanded ? fullDesc.replace(marked, '<mark>$&</mark>') : shortText
            }
            kbDescHeading.style.color = isExpanded ? 'black' : 'gray'
            toggleBtn.textContent = isExpanded ? "Show less" : "Show more"
            kbDescHeading.appendChild(toggleBtn)
        })
        kbDescHeading.appendChild(toggleBtn)
    }
    
    return kbDescHeading
}

/*      
        == End of Search Section ==       
*/

// Platform Support
function platformSupport(data) {
    const platformMap = {
        android: "Android",
        desktopWeb: "Web",
        ios: "iPhone and iPad",
        linux: "Linux",
        macos: "macOS",
        mobileWeb: "Mobile web",
        windows: "Windows"
    }
    let platformSpan = Object.entries(data)
        .filter(([_, supportLevel]) => supportLevel == 'full')
        .map(([platform]) => `<span class="platform-${platform.toLowerCase()}" title="${platformMap[platform]}">${platformMap[platform]}</span>`).join('')      
        
    return platformSpan
}

/*      == Section ==
    Keyboard Selection Menu 
*/
function addKbToSelectionMenu(kbIconPTag, cardWrap, kb, data) {
    const keyboardSelectionButton = document.getElementById('keyboardSelectionButton') 
    let isSelected = selectedKbList.some(selected => selected.id == kb.id)
    addDataKb(data)
    // Remove keyboard
    if (isSelected) {
        removeKbSelected(kb.id)
        kbIconPTag.textContent = '+'
        generateKbUI(selectedKbList)
        checkKbCardUI(kbIconPTag, cardWrap, kb)
        
        return
    }
    if(selectedKbList.length < 5) {
        addKbToSelection(kb)
        generateKbUI(selectedKbList)
        kbIconPTag.textContent = '✓'
        kbIconPTag.classList.add('kb-icon-plus-animate')

        setTimeout(() => {
            kbIconPTag.textContent = '-'
            kbIconPTag.classList.remove('kb-icon-plus-animate')
            keyboardSelectionButton.classList.remove('btn-secondary')
            keyboardSelectionButton.classList.add('btn-keyman-orange')
        }, 800)
        
        checkKbCardUI(kbIconPTag, cardWrap, kb)
        return
    }
    confirmAndAddKb(() => {
        addKbToSelection(kb)
        generateKbUI(selectedKbList)
        
        kbIconPTag.textContent = '✓'
        kbIconPTag.classList.add('kb-icon-plus-animate')

        setTimeout(() => {
            kbIconPTag.textContent = '-'
            kbIconPTag.classList.remove('kb-icon-plus-animate')
            keyboardSelectionButton.classList.remove('btn-secondary')
            keyboardSelectionButton.classList.add('btn-keyman-orange')
        }, 800)
        checkKbCardUI(kbIconPTag, cardWrap, kb)
    })
}

// Add keyboard for kb search and selection UI
function addKbToSelection(kb) {
    const kbInfo = {
        "id": kb.id,
        "name": kb.name,
        "version": kb.version,
        "helpLink": kb.helpLink,
        "platformSupport": kb.platformSupport,
        "totalDownloads": kb.match.totalDownloads,
        "sourcePath": kb.sourcePath,
        "supportedLanguage": kb.languages,
        "lastUpdated": kb.lastModifiedDate
    }
    // historyKbSelection.add(kbInfo)
    selectedKbList.push(kbInfo)
}

// UI for keyboard selection menu
function generateKbUI(selectedKbList) {
    const keyboardSelection = document.getElementById("keyboardSelection")
    keyboardSelection.innerHTML = ''

    if(selectedKbList.length < 1) {
        triggerKbCount(selectedKbList)
        resetKbSelectionMenu()
        return
    }

    const kbDivHeader = document.createElement('div')
    kbDivHeader.textContent = "Keyboard Selection menu"
    kbDivHeader.classList.add('kb-item-header')

    const kbDivFoot = document.createElement('div')
    kbDivFoot.textContent = "US Basic Keyboard"
    kbDivFoot.classList.add('kb-item-footer')

    keyboardSelection.appendChild(kbDivHeader)

    selectedKbList.forEach(data => {
        const kbDiv = document.createElement('div')
        kbDiv.classList.add("kb-item")
        kbDiv.setAttribute('id', `${data.id}`)
        
        const kbName = document.createElement('span')
        kbName.textContent = data.name

        const kbConfigList = document.createElement('ul')
        kbConfigList.classList.add('keyboard-configs')
        kbConfigList.innerHTML = `
            <li>
                <i class="fa-solid fa-info" 
                title="Keyboard info" 
                data-action="info" 
                data-id="${data.id}"></i>
            </li>
            <li>
                <i class="fa-solid fa-question" 
                title="Keyboard help documentation" 
                data-action="help" 
                data-helplink="${data.helpLink}"></i>
            </li>
            <li>
                <i class="fa-solid fa-download" 
                title="Download keyboard" 
                data-action="download" 
                data-id="${data.id}"></i>
            </li>
            <li>
                <i class="fa-solid fa-minus" 
                title="Remove keyboard" 
                data-action="remove" 
                data-id="${data.id}"></i>
            </li>
            `
        
        const kbDetails = displayKbDetails(data)

        kbDiv.appendChild(kbName)
        kbDiv.appendChild(kbConfigList)
        kbDiv.appendChild(kbDetails)
        keyboardSelection.appendChild(kbDiv)
        keyboardSelection.append(kbDivFoot)

        let kbdName = data.id
        let langCode = Object.keys(data.supportedLanguage)[0] || "en"

        selectKb(kbdName, langCode)
        kbConfigList.addEventListener('click', (e) => {
            const target = e.target
            if (target.tagName == 'I' && target.dataset.action) {
                const action = target.dataset.action
                const id = target.dataset.id
                const helpLink = target.dataset.helplink
                kbConfigMenu(action, id, helpLink)   
            }
        })
        
        kbDiv.addEventListener('click', () => {
            kbdName = data.id
            langCode = Object.keys(data.supportedLanguage)[0] || "en"
            textArea.focus()
            selectKb(kbdName, langCode)
        })

        kbDivFoot.onclick = () => {
            defaultKeyboard()
        }
        
        const kbHelpLink = document.querySelector('#kbHelpdocLink')
        kbHelpLink.addEventListener('click', (e) => {
            kbConfigMenu('help', '', data.helpLink)
        })
    })
    triggerKbCount(selectedKbList)
}

// Keyboard count for Keyboard selection menu
function triggerKbCount(selectedKbList) {
    const kbSelectedLength = selectedKbList.length
    const keyboardSelectionButton = document.querySelector('#keyboardSelectionButton') 
    const keyboardCount = document.querySelector('#kbCount')
    
    if (kbSelectedLength >= 1) {
        keyboardCount.classList.remove('fa-caret-right')
        keyboardCount.textContent = `${kbSelectedLength}`
        keyboardSelectionButton.classList.add('btn-keyman-orange')
        keyboardSelectionButton.classList.remove('btn-secondary')
    } else {
        keyboardCount.classList.add('fa-caret-right')
        keyboardCount.textContent = ''
        keyboardSelectionButton.classList.remove('btn-keyman-orange')
        keyboardSelectionButton.classList.add('btn-secondary')
    }
}

// Keyboard count default for Keyboard selection menu
function resetKbSelectionMenu() {
    const keyboardSelection = document.querySelector("#keyboardSelection")

    const kbDivHeader = document.createElement('div')
    kbDivHeader.textContent = "Keyboard Selection menu"
    kbDivHeader.classList.add('kb-item-header')

    const kbItem = document.createElement('div')
    kbItem.classList.add('.kb-item')

    const pTag = document.createElement('p')
    pTag.textContent = "Open Search to get your keyboard"

    const kbDivFoot = document.createElement('div')
    kbDivFoot.textContent = "US Basic Keyboard"
    kbDivFoot.classList.add('kb-item-footer')

    kbItem.appendChild(pTag)

    keyboardSelection.appendChild(kbDivHeader)
    keyboardSelection.appendChild(kbItem)
    keyboardSelection.appendChild(kbDivFoot)
}

// Compare and remove keyboard
function removeKbSelected(kbId) {
    if(kbId) {
        selectedKbList = selectedKbList.filter(kb => kb.id !== kbId)
    }
}

// Check 6th keyboard
function confirmAndAddKb(onConfirmAdd) {
    if (typeof onConfirmAdd != 'function') {
        console.log("Expected the onConfirmAdd a function, instead got: " + typeof onConfirmAdd)
        alert("Click on the keyboard again to enable.")
    }

    const warningDialogUI = limitKbSelectionUI(() => {
        onConfirmAdd()
        selectedKbList.shift()
        generateKbUI(selectedKbList)
    })
    
    document.body.appendChild(warningDialogUI)
}

// UI for Keyboard Selected Limitation
function limitKbSelectionUI(onAccept) {
    const dialogDiv = document.createElement('div')
    dialogDiv.classList.add('warning-container')

    const dialogContentDiv = document.createElement('div')
    dialogContentDiv.classList.add('warning-content')

    const dialogCancel = document.createElement('button')
    dialogCancel.classList.add('warning-cancel-btn')
    dialogCancel.setAttribute('id', 'cancelWarningBtn')
    dialogCancel.textContent = '✖'
    dialogCancel.onclick = () => {
        dialogDiv.remove()
        generateKbUI(selectedKbList)
    }

    const dialogImgTag = document.createElement('img')
    dialogImgTag.classList.add('warning-keyman-image')
    dialogImgTag.src = `/cdn/dev/img/keymanweb-mini-logo-88.png`
    dialogImgTag.alt = "Keyman Logo"

    const firstKeyboard = selectedKbList[0].name

    const dialogPTag = document.createElement('p')
    dialogPTag.classList.add('warning-text')
    dialogPTag.innerHTML = `The keyboards selected exceeds the limitation of <b>5 keyboards</b>. Click <i>'Allow'</i> to remove the <br/> ${firstKeyboard} keyboard.`
    
    const dialogUlTag = document.createElement('ol')
    dialogUlTag.textContent = "Your keyboards selection:"
    selectedKbList.forEach((kb, index) => {
        const dialogLiTag = document.createElement('li')
        if (index == 0) {
            const markKeyboard = document.createElement('mark')
            markKeyboard.textContent = kb.name
            dialogLiTag.appendChild(markKeyboard)
        } else {
            dialogLiTag.textContent = kb.name
        }
        dialogUlTag.appendChild(dialogLiTag)
        
    })

    const dialogAccept = document.createElement('button')
    dialogAccept.classList.add('warning-accept-btn')
    dialogAccept.setAttribute('id', 'acceptWarningBtn')
    dialogAccept.textContent = "Allow"
    dialogAccept.onclick = () => {
        dialogDiv.remove()
        onAccept()
    }

    dialogContentDiv.appendChild(dialogCancel)
    dialogContentDiv.appendChild(dialogImgTag)
    dialogContentDiv.appendChild(dialogPTag)
    dialogContentDiv.appendChild(dialogUlTag)
    dialogContentDiv.appendChild(dialogAccept)

    dialogDiv.appendChild(dialogContentDiv)

    return dialogDiv
}

// Seperate list for History/Remember Search

/* 
        ========================== To be continued ==========================
*/
function addDataKb(data) {
    let selectedKbData = []
    // console.log(data)
    const kbInfo = {
        "platformSupport": data.platformSupport,
        // "monthlyDownloads": data.match.downloads,
        "sourceFile": data.sourcePath,
    }
    selectedKbData.push(kbInfo)
}

// End of History search

// Keyboard selection menu's tools: help, download, and remove
function kbConfigMenu(action, id, helplink) {
    if (action == "help") {
        window.open(helplink, '_blank')
    }

    if (action == "download") {
        const downloadUrl = `https://keyman.com/keyboards/install/${id}`
        window.open(downloadUrl, '_blank')
    }

    if (action == "remove") {
        removeKbSelected(id)
        generateKbUI(selectedKbList)
        triggerKbCount(selectedKbList)
    }

    if (action == "info") {
        const kbDetails = document.querySelector(`#keyboard-${id}-details`)
        
        kbDetails.addEventListener('mouseleave', () => {
            kbDetails.classList.add('hidden')
        })
        kbDetails.classList.remove('hidden')
    }
}

// Keyboard details for Keyboard selection menu
function displayKbDetails(data) {
    const item = selectedKbList.find(kb => kb.id == data.id)
    if (!item) return;

    const kbDetails = document.createElement('div')
    kbDetails.classList.add('keyboard-details')
    kbDetails.setAttribute('id', `keyboard-${data.id}-details`)
    kbDetails.classList.add('animate__animated', 'animate__fadeIn')
    kbDetails.classList.add('hidden')

    const kbDetailsHead = document.createElement('div')
    kbDetailsHead.textContent = 'Keyboard Details'
    kbDetailsHead.classList.add('kb-item-header')
    
    const kbDetailsContent = document.createElement('div')
    kbDetailsContent.classList.add('keyboard-content-wrapper')
    kbDetailsContent.innerHTML = `
    <ul class="keyboard-content" id="keyboardContent">
        <li class="keyboard-name">
            <div class="row">
                <div class="col">Name</div>
                <div class="col">${item.name || "N/A"}</div>
            </div>
        </li>
        <li class="keyboard-details-id">
            <div class="row">
                <div class="col">Keyboard ID</div>
                <div class="col">${item.id || "N/A"}</div>
            </div>
        </li>
        <li class="keyboard-version">
            <div class="row">
                <div class="col">Version</div>
                <div class="col">${item.version || "N/A"}</div>
            </div>
        </li>
        <li class="keyboard-total-download">
            <div class="row">
                <div class="col">Total downloads</div>
                <div class="col">${item.totalDownloads || 0}</div>
            </div>
        </li>
        <li class="keyboard-source-path">
            <div class="row">
                <div class="col">Source Path</div>
                <div class="col"><a href="https://github.com/keymanapp/keyboards/tree/master/${item.sourcePath}" target="_blank">${item.sourcePath || "N/A"}</a></div>
            </div>
        </li>
        <li class="keyboard-platforms">
            <div class="row">
                <div class="col">Supported Platforms</div>
                <div class="col platform">
                    ${platformSupport(item.platformSupport) || 'No platforms supported'}
                </div>
            </div>
        </li>
        <li class="keyboard-last-updated">
            <div class="row">
                <div class="col">Last Updated</div>
                <div class="col">${getOnlyDates(item.lastUpdated) || 0}</div>
            </div>
        </li>
    </ul>
    `
    kbDetails.appendChild(kbDetailsHead)
    kbDetails.appendChild(kbDetailsContent)
    
    return kbDetails
}

// Get only the YYYY-mm-dd format
function getOnlyDates(dateData) {
    const finalDateData = dateData.match(/^\d{4}-\d{2}-\d{2}/)
    return finalDateData
}

// Validate URLs
function validateURL(string) {
    try {
        const newUrl = new URL(string)
        if (newUrl.protocol === 'https:') {
            return newUrl
        } else {
            return false
        }
    } catch (error) {
        console.error(error)
    }
}
/*      
        == End of Keyboard Selection menu Section ==       
*/

/* 
        == Store data in localStorage to use for reload ==
*/
let appState = { 
    fontSize: 16,
    writtenText: "",
    selectedKbList: [],
    enabledKb: null,
    keyboardSizes: null,
    textAreaSizes: null
}
const keyboardContainer = document.querySelector('.keyboard-container')
const fontSizeRange = document.querySelector('#fontSizeRange')

function getFontSize(element) {
    let theFontSize
    theFontSize = parseInt(window.getComputedStyle(element).fontSize) || "16"
             
    return theFontSize
}

function getSelectedKb() {
    return selectedKbList || []
}

function getEnabledKb() {
    let hash = location.hash.match(/^#(.+),(Keyboard_.+)$/i)[0]
    
    let kbValues = hash.replace('#', '')
    kbValues = hash.split(',')

    return [hash, kbValues]
}

function getElementsSize(element) {
    const rect = element.getBoundingClientRect()
    return {
        height: rect.height,
        width: rect.width,
        positionX: rect.x,
        positionY: rect.y
    }
}

function getElementValue(element) {
    return element.value
}

function setFontSize(size) {
    textArea.style.fontSize = size + "px"
    fontSizeRange.value = size
}

function setWrittenText(text) {
    textArea.value = text
}

function setElementsSize(element, sizes) {
    element.style.height = sizes.height + "px"
    element.style.left = sizes.positionX + "px"
    element.style.top = sizes.positionY + "px"
}

function setSelectedKb(savedKbList) {
    selectedKbList = savedKbList
}

function setEnabledKb(kb) {
    if (kb) {
        selectKb(kb)
    }
}

function buildAppState() {
    appState = {
        fontSize: getFontSize(textArea),
        selectedKbList: getSelectedKb(),
        enabledKb: getEnabledKb(),
        textAreaSizes: getElementsSize(textArea),
        keyboardSizes: getElementsSize(keyboardContainer),
        writtenText: getElementValue(textArea)
    }
    saveSettings("keymanWebState", appState)
}

function saveSettings(key, state) {
    let recentTime = new Date()
    const time = 5000 // equals to An hour
    let item
    
    // console.log("recentTime: ", recentTime)
    // console.log("recentTime.getTime(): ", recentTime.getTime())

    if (state) {
        item = {
            value: state,
            expiry: recentTime.getTime() + time
        }
    } 
    localStorage.setItem(key, JSON.stringify(item))
}

function loadSettings(key) {
    const raw = localStorage.getItem(key)
    if (raw) {
        let appState = JSON.parse(raw)
        const newTime = new Date()
        
        console.log("newTime: ", newTime, "appState.expiry: ", appState.expiry)
        console.log(newTime.getTime() > appState.expiry)
        if (newTime.getTime() > appState.expiry) {
            localStorage.removeItem(key)
            alert("Session expired!")
            return null
        }

        setFontSize(appState.value.fontSize)
        setWrittenText(appState.value.writtenText)
        setElementsSize(textArea, appState.value.textAreaSizes)
        setElementsSize(keyboardContainer, appState.value.keyboardSizes)
        setSelectedKb(appState.value.selectedKbList)
        setEnabledKb(appState.value.enabledKb[0])

        generateKbUI(appState.value.selectedKbList)
        console.log(appState.value.enabledKb[1][1], appState.value.enabledKb[1][0])
        // selectKb(appState.value.enabledKb[1][1], appState.value.enabledKb[1][0])
    }
}

window.addEventListener('load', () => {
    loadSettings("keymanWebState")
})

window.addEventListener('beforeunload', () => {
    buildAppState()
})

window.addEventListener('storage', (e) => {
    if (e.key == "keymanWebState") {
        appState = JSON.parse(e.newValue)
        buildAppState()
    }
})

function searchHistory(value) {
    if (kbSearchData.length < 0) {
        kbSearchData.push(value)
        for (i=0; i<=kbSearchData.length; i++) {
            if (value != kbSearchData[i] || kbSearchData.length >= 5) {
                kbSearchData.shift()
            }
        }
    }
    // console.log(kbSearchData)
}