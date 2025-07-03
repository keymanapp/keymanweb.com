keyman = getKeymanWeb()

function getKeymanWeb() {
    if(window.tavultesoft) {
      return window.tavultesoft.keymanweb;
    }
    return window.keyman;
}

/* Global Variables */
let selectedKbList = []
let dataKbForRemoval

/* Search Box */
const searchBoxForm = document.querySelector('.form')
searchBoxForm.addEventListener('click', function(e) {
    e.stopPropagation()
})

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

searchBtn = document.getElementById('mainSearchBtn')

const clearSearchIcon = document.querySelector('.clear-icon')
const searchIcon = document.querySelector('.search-icon')

/* Click: Open Search and Display search instructions */
searchBtn.addEventListener('click', function(e) {
    if (e.target.value.trim() == "") {
        resetSearch()
    }
})

/* Input: Search and Display keyboards */
searchBtn.addEventListener('input', function(e) {
    handleSearch(e.target.value)
})

clearSearchIcon.addEventListener('click', () => {
    searchBtn.value = ''
    handleSearch()
    searchBtn.focus()
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
    searchIcon.style.display = hasValue ? 'none' : 'inline'
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
        // dataKbForRemoval = selectedKbList
    })
    paginationCtrl.style.display = 'flex';
}

// UI Search card
function searchKbCardUI(kb, marked = '', data) {
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
    kbIconPTag.onclick = () => {addKbToSelectionMenu(kbIconPTag, cardWrap, kb, data)}
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
            kbDescHeading.innerHTML = !isExpanded ? shortText.replace(marked, '<mark>$&</mark>') : fullDesc
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
    confirmAndAddKb(kbIconPTag, kb, () => {
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
    console.log(kb)
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

        kbConfigList.addEventListener('click', (e) => {
            const target = e.target
            if (target.tagName == 'I' && target.dataset.action) {
                const action = target.dataset.action
                const id = target.dataset.id
                const helpLink = target.dataset.helplink
                kbConfigMenu(action, id, helpLink)
            }
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
    keyboardSelection.innerHTML = ''
    const pTag = document.createElement('p')
    pTag.textContent = "Open Search to get your keyboard"
    keyboardSelection.appendChild(pTag)
}

// Compare and remove keyboard
function removeKbSelected(kbId) {
    if(kbId) {
        selectedKbList = selectedKbList.filter(kb => kb.id !== kbId)
    }
    generateKbUI(selectedKbList)
}

// Check 6th keyboard
function confirmAndAddKb(kbIconPTag, kb, onConfirmAdd) {
    const warningDialogUI = limitKbSelectionUI(() => {
        selectedKbList.shift()
        onConfirmAdd()
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

let selectedKbData = []
function addDataKb(data) {
    // console.log(data)
    const kbInfo = {
        "platformSupport": data.platformSupport,
        // "monthlyDownloads": data.match.downloads,
        "sourceFile": data.sourcePath,
    }
    selectedKbData.push(kbInfo)
}

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

// Change and type keyboard
const downloadBtn = document.getElementById('kbDownloadPage')
const textArea = document.getElementById('textArea')
async function changeKeyboard(kbdname, languageCode) {
    
    // selectedKbList.forEach(data => {
    //     let kbName = data.id
    //     let langCode = data.script
        
    //     changeKeyboard(kbName, langCode)
    // })
    console.log("kbdname: ", kbdname, " + ", "languageCode: ", languageCode)
    if(kbdname == '') {
        if (textArea) textArea.placeholder = 'Select a keyboard and start typing'
    }
    location.replace('#' + languageCode + ',Keyboard_' + kbdname);

    var kbd = keyman.getKeyboard(kbdname, languageCode); // Good
    await keyman.setActiveKeyboard(kbdname, languageCode) // Good
    console.log("kbd: ", kbd)

    if(kbd) {
        textArea.placeholder = 'The ' + kbd.InternalName + ' keyboard is selected. Start typing...'
    }
    
    const kbSpan = document.querySelector('#kbSpan')
    const kbHelpDocATag = document.querySelector('#kbHelpdocLink')
    textArea.placeholder = `The ${kbdname} keyboard is selected. Please start typing...`
    kbSpan.innerHTML = `${kbdname}`
    // kbHelpDocATag.href = `${kbdHelpLink}`

    if(typeof(KeyboardChange_EmbedFonts) != 'undefined') KeyboardChange_EmbedFonts(kbdname);
}

function enableKbToType() {
    // kbDiv.addEventListener('mouseenter', () => {
    //     kbDiv.style.cursor = "pointer"
    //     openKbDetails()
    // })
    
    kbDiv.addEventListener('click', async (e) => {
        e.preventDefault()

        if (!data.id || !data || !item.helpLink) {
            console.error("Missing Data or Item")
        }

        let kbName = `Keyboard_${data.id}`
        let keyboards = keyman.getKeyboards();
        let keyboard = keyboards.find(keyboard => keyboard.InternalName == kbName)

        // console.log("All keyboards: ", keyboards)
        // console.log("My keyboard: " + keyboard)
        if(keyboard) {
            languageCode = keyboard.LanguageCode
            changeKeyboard(data.id, languageCode, item.helpLink)
        } else {
            console.warn("Keyboard not found: ", kbName)
        }
    })
}

/*          == Section ==
    UI interaction and manipulation
*/

/*  UI Behavior of the Selected Keyboard menu */
const kbSelection = document.querySelector('#keyboardSelection')
const kbSelectionWrap = document.querySelector('.scroll-wrapper-keyboard-tab')
const keyboardSelectionButton = document.getElementById('keyboardSelectionButton') 
keyboardSelectionButton.addEventListener('mouseenter', () => {
    kbSelection.classList.add('open')
})
keyboardSelectionButton.addEventListener('click', () => {
    kbSelection.classList.remove('open')
})
kbSelection.addEventListener('mouseleave', () => {
    kbSelection.classList.remove('open')
})

/*
    Toggle between World Map and Search
*/
const worldMapBtn = document.querySelector('#worldMap')
const kmwControls = document.querySelector('#KeymanWebControl')
const langSearchDropdown = document.querySelector('#languageSearchDropdown')
const caretRightIcon = keyboardSelectionButton.querySelector('.fa-caret-right')
const infoIcon = document.querySelector('#infoIcon')

let mapIsOpen
worldMapBtn.onclick = () => {
    toggleMapAndKb()
}

function toggleMapAndKb() {
    if (mapIsOpen == true) {
        openSearch()
    } else {
        openMap()
        returnToSearchBtn()
    }
}

function openMap() {
    mapIsOpen = true

    kmwControls.classList.remove('hidden')
    kmwControls.style.display = "block"
    langSearchDropdown.classList.add('hidden')

    searchBoxForm.innerHTML = ''
    searchBoxForm.appendChild(kmwControls)
}

function openSearch() {
    mapIsOpen = false

    kmwControls.classList.add('hidden')
    kmwControls.style.display = "none"
    langSearchDropdown.classList.remove('hidden')
    infoIcon.classList.remove('hidden')

    searchBoxForm.innerHTML = ''
    searchBoxForm.appendChild(searchBtn)
    searchBoxForm.appendChild(infoIcon)
    searchBoxForm.appendChild(langSearchDropdown)
}

function returnToSearchBtn() {
    caretRightIcon.classList.remove('fa-caret-right')
    caretRightIcon.classList.add('fa-magnifying-glass')
    keyboardSelectionButton.style.backgroundColor = "var(--keyman-orange)"
    keyboardSelectionButton.style.border = '0px'
    keyboardSelection.style.display = "none"
    keyboardSelectionButton.onclick = () => {
        caretRightIcon.classList.remove('fa-magnifying-glass')
        caretRightIcon.classList.add('fa-caret-right')
        keyboardSelectionButton.style.backgroundColor = ""
        keyboardSelection.style.display = "block"
        openSearch()
    }
}
