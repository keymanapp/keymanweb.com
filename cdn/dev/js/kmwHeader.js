keyman = getKeymanWeb()

function getKeymanWeb() {
    if(window.tavultesoft) {
      return window.tavultesoft.keymanweb;
    }
    return window.keyman;
}

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
    kbSearchCard.innerHTML = `
    <div class="search-instruction">
        <h5>Instruction</h5>
        <ol class="search-instruction-list">
            <li>Search for any Keyman keyboard</li>
            <li>Once the keyboard you are looking for appears, click on it will enable and store it in the keyboard selection (arrow icon next to search)</li>
            <li>You can switch between keyboards and start typing.</li>
        </ol>
    </div>
    `
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

/* Display top downloads with search Instruction 
    ON PAUSED
*/
async function displayTopDownloads() {
    kbSearchCard.innerHTML = `<div>Loading...</div>`
    try {
        let response = await fetch(`https://api.keyman.com/cloud/4.0/languages?p=${currentPage}`)
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`)
        }

        let data = await response.json()
        console.log(data)
        let dataLanguages = data.languages.languages

        if (!dataLanguages || !Array.isArray(dataLanguages)) {
            throw new Error(`Invalid API response structure`)
        }

        if (data.context) {
            currentPage = data.context.pageNumber || 1
            totalPage = data.context.totalPage || 1
        } else {
            totalPage = Math.ceil(dataLanguages.length / itemPerPage) 
        }
        updatePaginationCtrl()
        displaySearch(dataLanguages, dataLanguages.length)
    } 
    catch(error) {
        console.error(`Error fetching languages ${error}`)
        kbSearchCard.innerHTML = `<div>No languages are found.</div>`
        paginationCtrl.style.display = 'none'
    }
}

/* Get query and return search */
let dataKbForRemoval
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
let selectedKbList = []
let selectedKbData = []
function displaySearch(data, total = 0, query) {
    kbSearchCard.innerHTML = '';

    if (!data || data.length == 0) {
        kbSearchCard.innerHTML = '<div class="loading">No language found.</div>'
        paginationCtrl.style.display = 'none'
        return
    }

    if (total) {
        searchResultCount.innerHTML = `${total} results`
        searchResultCount.classList.remove('hidden')
    }
    
    // Getting searched Word ready for highlight
    let escapedTerm = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    let marked = new RegExp(escapedTerm, 'i')

    // Loop through the keyboard data
    data.forEach(kb => {
        let matchFound = false
        let matchField = ""
        let matchValue = ""

        // For checking if the keyboard exists
        let kbFoundInList = selectedKbList.some(selected => selected.id == kb.id)
        
        let cardWrap = document.createElement('div')
        cardWrap.classList.add('card-wrap')
        cardWrap.setAttribute('id', 'keyboardCardWrap')
        
        let cardHeader = document.createElement('div')
        cardHeader.classList.add('card-header')

        let kbNameHeading = document.createElement('h4')
        
        // Get language that matches the search term
        for (lang in kb.languages) {
            let langData = kb.languages[lang]
            for (key in langData) {
                const value = langData[key]
                if (typeof value == "string" && marked.test(value)) {
                    matchFound = true
                    matchValue = value.replace(marked, '<mark>$&</mark>')
                    matchField = "language"
                    break
                }
            }
        }

        // Find a match
        if (!matchFound && marked.test(kb.name)) {
            matchFound = true
            matchValue = kb.name.replace(marked, '<mark>$&</mark>')
            matchField = "keyboard"
        }

        if (!matchFound && marked.test(kb.description)) {
            matchFound = true
            matchField = "description"
        }

        // Display matched language
        const langNameSpan = document.createElement('span')
        langNameSpan.style.fontSize = "14px"
        if (matchField == "language") {
            langNameSpan.innerHTML = matchField == "language" ? ` (${matchValue} language)` : ""
        }

        // Display matched keyboard
        if (matchField == "keyboard") {
            kbNameHeading.innerHTML = matchValue
        } else {
            kbNameHeading.innerHTML =  kb.name
        }
        
        const kbIconPTag = document.createElement('p')
        kbIconPTag.textContent = "+"
        kbIconPTag.style.fontSize = '20px'
        kbIconPTag.style.cursor = 'pointer'

        const kbIdPTag = document.createElement('p')
        kbIdPTag.classList.add('keyboard-id')
        kbIdPTag.textContent = kb.id

        kbNameHeading.appendChild(langNameSpan)
        cardHeader.appendChild(kbNameHeading)
        cardHeader.appendChild(kbIconPTag)

        // Keyboard Description
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

        const kbSpecs = document.createElement('div')
        kbSpecs.classList.add('keyboard-specs')

        const kbDownloadHeading = document.createElement('h6')
        kbDownloadHeading.textContent = `${kb.match.downloads} monthly downloads`
        kbDownloadHeading.classList.add('monthly-download')

        const kbPlatformSupport = document.createElement('div')
        kbPlatformSupport.classList.add('platform')
        kbPlatformSupport.innerHTML = platformSupport(kb.platformSupport)

        kbSpecs.appendChild(kbDownloadHeading)
        kbSpecs.appendChild(kbPlatformSupport)

        cardWrap.appendChild(cardHeader)
        cardWrap.appendChild(kbIdPTag)
        cardWrap.appendChild(kbDescHeading)
        cardWrap.appendChild(kbSpecs)
        kbSearchCard.appendChild(cardWrap)

        // Choose keyboard to selection
        kbIconPTag.onclick = () => {
            selectedKbData.push({
                "id": kb.id,
                "name": kb.name,
                "version": kb.version,
                "helpLink": kb.helpLink,
                "platformSupport": kb.platformSupport,
                "totalDownloads": kb.match.totalDownloads,
            })
            populateSelectedKeyboard(kb) 
            displaySearch(data, total, query)
        }
        
        // Disable keyboard card in search
        if (kbFoundInList) {
            cardWrap.classList.add('disabled')
            cardWrap.style.pointerEvents = 'none'
            cardWrap.style.opacity = "50%"
        } 
        dataKbForRemoval = selectedKbData
    })
    paginationCtrl.style.display = 'flex';
}

/* Platform Support */
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

/* Selected Keyboard Selection */
function populateSelectedKeyboard(language = null) {
    if(selectedKbList.length > 4) {
        alert("The maximum keyboard selection is 5")
        return false;
    }
    if (language?.id) {
        if(!selectedKbList.some(e => e.id == language.id)) {
            selectedKbList.push({
                id: language.id,
                keyboard: language.name,
                language: language.languages,
            }) 
        } 
    }
    // Create the Language List
    generateKbUI(selectedKbList)
}

/* Compare and remove keyboard 
        ON PAUSED
*/
function removeKeyboard(kbId) {
    if(kbId) {
        selectedKbList = selectedKbList.filter(kb => kb.id !== kbId)
    }
    // populateSelectedKeyboard(selectedKbList)
    // console.log(dataKbForRemoval)
    displaySearch(selectedKbList)
}

/* Generate Language's keyboards 
        ON PAUSED
*/
const keyboardSelectionButton = document.getElementById('keyboardSelectionButton')

function generateKbUI(selectedKbList) {
    const keyboardSelection = document.getElementById("keyboardSelection")
    keyboardSelection.innerHTML = ''

    if (!selectedKbList.length) {
        keyboardSelectionButton.classList.remove('btn-keyman-orange')
        keyboardSelectionButton.classList.add('btn-secondary')
        const noKbPTag = document.createElement('p')
        noKbPTag.textContent = "Open Search to get your keyboard"
        keyboardSelection.appendChild(noKbPTag)
        return
    }
    
    keyboardSelectionButton.classList.remove('btn-secondary')
    keyboardSelectionButton.classList.add('btn-keyman-orange')

    selectedKbList.forEach(data => {
        // Language Parent tags
        const kbDiv = document.createElement('div')
        kbDiv.classList.add("kb-item")
        kbDiv.setAttribute('id', `${data.id}`)
        
        const item = selectedKbData.find(kb => kb.id == data.id)
        // console.log(selectedKbData)
        if (!item) return;
        
        kbDiv.textContent = data.keyboard
        const kbDetails = document.createElement('div')
        kbDetails.setAttribute('id', 'keyboardDetails')
        kbDetails.classList.add('hidden')
        kbDetails.innerHTML = `
        <ul class="keyboard-content" id="keyboardContent">
            <li>
                <i class="fa-solid fa-question" id="helpDocKeyboard"></i>
                <i class="fa-solid fa-download" id="downloadKeyboard"></i>
                <i class="fa-solid fa-minus" id="removeKeyboard"></i>
            </li>
            <li class="keyboard-version">
                <div class="row">
                    <div class="col">Version</div>
                    <div class="col">${item.version || "N/A"}</div>
                </div>
            </li>
            <li class="keyboard-helplink">
                <div class="row">
                    <div class="col">Keyboard document</div>
                    <div class="col"><a href="${item.helpLink}">${item.name} help</a></div>
                </div>
            </li>
            <li class="keyboard-total-download">
                <div class="row">
                    <div class="col">Total downloads</div>
                    <div class="col">${item.totalDownloads || 0}</div>
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
        </ul>
        `
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
        kbDiv.appendChild(kbDetails)
        keyboardSelection.appendChild(kbDiv)
    })
}

const kbSelection = document.querySelector('#keyboardSelection')
keyboardSelectionButton.addEventListener('mouseenter', () => {
    kbSelection.style.width = "100%"
})
keyboardSelectionButton.addEventListener('click', () => {
    kbSelection.style.width = "0px"
})
kbSelection.addEventListener('mouseleave', () => {
    kbSelection.style.width = "0px"
})
