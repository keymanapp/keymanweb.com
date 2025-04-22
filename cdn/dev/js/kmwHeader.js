/* Search Box */
const searchBoxForm = document.querySelector('.form')
searchBoxForm.addEventListener('click', function(e) {
    e.stopPropagation()
})

/* Search */
const languageSearchList = document.getElementById('languageSearchList');
let debounceTimer

/* Pagination */
prevBtn = document.getElementById('prevPage')
nextBtn = document.getElementById('nextPage')
pageInfo = document.getElementById('pageInfo')
searchResultCount = document.getElementById('resultCount')
paginationCtrl = document.getElementById('paginationControls')
let currentPage = 1
let currentQuery = ''
let totalPages
const itemPerPage = 10

searchBtn = document.getElementById('mainSearchBtn')

/* Input: Search and Display keyboards */
searchBtn.addEventListener('input', function(e) {
    currentQuery = e.target.value.trim()
    currentPage = 1
    if (currentQuery == '') {
        paginationCtrl.style.display = 'none'
        displaySearchInstruction()
    }
    debounceSearch(currentQuery, currentPage)
})

/* Click: Open Search and Display languages */
searchBtn.addEventListener('click', function(e) {
    currentQuery = e.target.value.trim()
    if (currentQuery == '') {
        paginationCtrl.style.display = 'none'
        displaySearchInstruction()
    }
})

function displaySearchInstruction() {
    languageSearchList.innerHTML = `<div>Loading instruction, please wait...</div>`
    try {
        languageSearchList.innerHTML = `
        <div class="search-instruction">
            <h5>Instruction</h5>
            <ol class="search-instruction-list">
                <li>Search for a keyboard (Hover on the <i class="fa-solid fa-question"></i> above for help)</li>
                <li>Once the keyboard you are looking for appears, click on it will enable and store it in the keyboard selection (red icon next to search)</li>
                <li>You can switch between keyboards and start typing.</li>
            </ol>
        </div>
    `
    } catch (error) {
        
    }
}

async function displayLanguage() {
    languageSearchList.innerHTML = `<div>Loading...</div>`
    try {
        let response = await fetch(`https://api.keyman.com/cloud/4.0/languages?p=${currentPage}`)
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`)
        }

        let data = await response.json()
        let dataLanguages = data.languages.languages

        if (!dataLanguages || !Array.isArray(dataLanguages)) {
            throw new Error(`Invalid API response structure`)
        }

        if (data.context) {
            currentPage = data.context.pageNumber || 1
            totalPages = data.context.totalPages || 1
        } else {
            totalPages = Math.ceil(dataLanguages.length / itemPerPage) 
        }
        updatePaginationCtrl()
        displaySearch(dataLanguages, dataLanguages.length)
    } 
    catch(error) {
        console.error(`Error fetching languages ${error}`)
        languageSearchList.innerHTML = `<div>No languages are found.</div>`
        paginationCtrl.style.display = 'none'
    }
}

function debounceSearch(query, page) {
    clearTimeout(debounceTimer)
    if (query.length > 1) {
        debounceTimer = setTimeout(() => {
            searchKeyboard(query, page)
        }, 300)
    }
}

let dataKbForRemoval
async function searchKeyboard(query = null, page) {
    languageSearchList.innerHTML = `<div>Searching ${query}...</div>`
    languageSearchList.style.display = 'block'

    if (query == '') {
        displaySearchInstruction()
        searchBtn.placeholder = "Search..."
    }

    try {
        let response = await fetch(`https://api.keyman.com/search/2.0?q=${encodeURIComponent(query)}&p=${page}`)
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`)
        }

        let data = await response.json()

        if (data.context) {
            totalPages = data.context.totalPages || 1;
            currentPage = data.context.pageNumber || 1;
        } else {
            totalPages = Math.ceil(data.keyboards.length / itemPerPage);
        }

        let dataKeyboards = data.keyboards
        dataKbForRemoval = data.keyboards
        if (!dataKeyboards || !Array.isArray(dataKeyboards)) {
            throw new Error("Invalid API response structure")
        }
        let resultCount = data.context.totalRows

        updatePaginationCtrl()
        displaySearch(dataKeyboards, resultCount)
    } catch(error) {
        console.error('Error fetching languages: ', error)
        languageSearchList.innerHTML = `<div>Failed to load result, please try again...</div>`
        paginationCtrl.style.display = 'none'
    }
}

let selectedLanguagesList = []
let keyboardData = []
function displaySearch(data, total = 0) {
    if (!data || data.length == 0) {
        languageSearchList.innerHTML = `<div class="loading">No language found.</div>`
        paginationCtrl.style.display = 'none'
        return
    }

    if (total) {
        searchResultCount.innerHTML = `${total} results`
        searchResultCount.classList.remove("hidden")
    }

    const languageSearchList = document.getElementById('languageSearchList');
    languageSearchList.innerHTML = '';
    data.forEach(kb => {
        let languageFoundInList = selectedLanguagesList.some(selected => selected.id == kb.id)
        let cardWrap = document.createElement('div')
        cardWrap.classList.add('card-wrap')
        cardWrap.onclick = () => populateSelectedKeyboard(kb)
        if (languageFoundInList) {
            cardWrap.classList.add('disabled')
            cardWrap.style.color = 'gray'
            cardWrap.style.pointerEvents = 'none';
        } else {
            cardWrap.onclick = () => {
                keyboardData.push({
                    "id": kb.id,
                    "name": kb.name,
                    "version": kb.version,
                    "helpLink": kb.helpLink,
                    "platformSupport": kb.platformSupport,
                    "totalDownloads": kb.match.totalDownloads,
                })
            populateSelectedKeyboard(kb) 
            displaySearch(data)
            }
        }

        let cardHeader = document.createElement('div')
        cardHeader.classList.add('card-header')
        let languageHeader = document.createElement('h4')
        languageHeader.textContent = kb.name
        let languageScript = document.createElement('p')
        languageScript.textContent = `v${kb.version}`

        cardHeader.appendChild(languageHeader)
        cardHeader.appendChild(languageScript)

        let languageDesc = document.createElement('h6')
        languageDesc.textContent = `${kb.id}`
        let languageKeyboard = document.createElement('h6')
        languageKeyboard.textContent = `Supported language: ${Object.keys(kb.languages).length}`

        cardWrap.appendChild(cardHeader)
        cardWrap.appendChild(languageDesc)
        cardWrap.appendChild(languageKeyboard)

        languageSearchList.appendChild(cardWrap)
    })
    paginationCtrl.style.display = 'flex';
}

prevBtn.addEventListener('click', goPrevPage)
nextBtn.addEventListener('click', goNextPage)

function updatePaginationCtrl() {
    pageInfo.textContent = `${currentPage} of ${totalPages}`
    nextBtn.disabled = currentPage >= totalPages
    prevBtn.disabled = currentPage <= 1
}

function goPrevPage() {
    if (currentPage > 1) {
        currentPage--
        searchKeyboard(currentQuery, currentPage)
    }
}

function goNextPage() {
    if (currentPage < totalPages) {
        currentPage++
        searchKeyboard(currentQuery, currentPage)
    }
}

const mostDownloadBtn = document.getElementById('mostDownload')
mostDownloadBtn.addEventListener('click', function() {
    clearTimeout(debounceTimer)

    debounceTimer = setTimeout(() => {
        filterMostDownload(currentQuery, currentPage)
    }, 300)
})

async function filterMostDownload(query, page) {
    try {
        let response = await fetch(`https://api.keyman.com/search/2.0?q=${encodeURIComponent(query)}&p=${page}`)

        let data = await response.json()
        datakeyboards.forEach((d) => {
            console.log(d.match.totalDownloads)
        })
    } catch (error) {
        console.error('Error fetching downloads: ', error)
    }
}

function populateSelectedKeyboard(language = null) {
    if(selectedLanguagesList.length > 4) {
        alert("The maximum keyboard selection is 5")
        return false;
    }   
    if (language?.id) {
        if(!selectedLanguagesList.some(e => e.id == language.id)) {
            selectedLanguagesList.push({
                id: language.id,
                keyboard: language.name,
                language: language.languages,
            }) 
        } 
    }
    // Create the Language List
    generateKbUI(selectedLanguagesList)
}

/* Generate Language's keyboards */
const keyboardSelectionButton = document.getElementById('keyboardSelectionButton')

function generateKbUI(selectedLanguagesList) {
    const keyboardSelectionList = document.getElementById("keyboardSelectionList")
    keyboardSelectionList.innerHTML = ''

    if (!selectedLanguagesList.length) {
        keyboardSelectionButton.classList.remove('btn-danger')
        keyboardSelectionButton.classList.add('btn-secondary')
        const noKbPTag = document.createElement('p')
        noKbPTag.textContent = "Open Search to get your keyboard"
        keyboardSelectionList.appendChild(noKbPTag)
        return
    }
    
    keyboardSelectionButton.classList.remove('btn-secondary')
    keyboardSelectionButton.classList.add('btn-danger')

    const platformMap = {
        android: "Android",
        desktopWeb: "Web",
        ios: "iPhone and iPad",
        linux: "Linux",
        macos: "macOS",
        mobileWeb: "Mobile web",
        windows: "Windows"
    }
    
    selectedLanguagesList.forEach(data => {
        // Language Parent tags
        const kbDetail = document.createElement('details')
        kbDetail.classList.add("keyboard-details")
        kbDetail.setAttribute('id', `${data.id}`)
        
        const item = keyboardData.find(kb => kb.id == data.id)
        if (!item) return;

        let platformSpan = Object.entries(item.platformSupport)
        .filter(([_, supportLevel]) => supportLevel == 'full')
        .map(([platform]) => `<span class="platform-${platform.toLowerCase()}">${platformMap[platform]}</span>`)
        
        kbDetail.innerHTML = `
        <summary class="keyboard-title">
            <span id="openKbDetails">▼</span>
            <h5 id="keyboardName" data-id="${data.id}">${data.keyboard}</h5>
            <i class="fa-solid fa-question" id="helpDocKeyboard"></i>
            <i class="fa-solid fa-download" id="downloadKeyboard"></i>
            <i class="fa-solid fa-minus" id="removeKeyboard"></i>
        </summary>
        <ul class="keyboard-content" id="keyboardDetails">
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
                        ${platformSpan.join(' ') || 'No platforms supported'}
                    </div>
                </div>
            </li>
        </ul>
        `
        kbDetail.querySelector('#openKbDetails').onclick = () => openKbDetails(data.id)
        kbDetail.querySelector('#keyboardName').onclick = function(e) {
            e.preventDefault()
            selectKbToType(data.id)
        }
        kbDetail.querySelector('#helpDocKeyboard').onclick = () => goToKbHelpDoc(item.helpLink)
        kbDetail.querySelector('#downloadKeyboard').onclick = () => goToDownloadKeyboard(data.id)
        kbDetail.querySelector('#removeKeyboard').onclick = () => removeKeyboard(item.id)

        keyboardSelectionList.appendChild(kbDetail)
    })
}

function goToKbHelpDoc(kbLink) {
    try {
        window.open(kbLink, 'blank', 'noopener, noreferrer')
    } catch (error) {
        console.error('Failed to Open the help URL: ', error)
        alert('Could not open the help documentation. Visit keyman.com/keyboard_name')
    }
}

function goToDownloadKeyboard(kbId) {
    window.open(`https://keyman.com/keyboards/install/${kbId}`, 'blank', 'noopener', 'noreferrer')
}

function selectKbToType(kbId) {
    const keyboardSelectionList = document.getElementById("keyboardSelectionList").children
    for (element of keyboardSelectionList) {
        const keyboardTitle = element.querySelector('#keyboardName')
        keyboardTitle.style.opacity = element.id == kbId ? "50%" : "100%"
    }
    const kbSelectionDropdownBtn = document.getElementById('keyboardSelectionButton')
    kbSelectionDropdownBtn.textContent = `${kbId}`
    textArea.placeholder = `The ${kbId} keyboard is selected. Please start typing...`
    updateExample(kbId)
}

function openKbDetails() {
    const kbDetails = document.querySelector(".keyboard-detail")
    const kbDetailsBtn = document.querySelector("#openKbDetails")
    kbDetails.open = !kbDetails.open
    kbDetailsBtn.textContent = kbDetails.open ? "▲" : "▼"
    kbDetailsBtn.classList.remove("fa-square-caret-down")
}

const textArea = document.getElementById('textArea')
function selectKeyboardToType(keyboard) {
    textArea.classList.add("textarea-animation")
    textArea.placeholder = `The ${keyboard} Keyboard is selected. Please start typing...`
    setTimeout(() => {
        textArea.classList.remove("textarea-animation")
    }, 500)
}

function removeKeyboard(kbId) {
    if(kbId) {
        selectedLanguagesList = selectedLanguagesList.filter(kb => kb.id !== kbId)
    }
    populateSelectedKeyboard(selectedLanguagesList)
    displaySearch(dataKbForRemoval)
}

/* Font Size Slider */
fontSizeSlider = document.getElementById("fontSizeSlider")
dropdownElement = document.querySelector('.font-size-slider')
dropdown = new bootstrap.Dropdown(dropdownElement.querySelector('[data-bs-toggle="dropdown"]'))

dropdownElement.addEventListener('mouseenter', function() {
    dropdown.show();
})

dropdownElement.addEventListener('onmouseleave', function() {
    setTimeout(() => {
        if (!dropdownElement.matches(':hover')) {
            dropdown.hide()
        }
    }) 
})

function goToKbDownloadPage(kbId) {
    if(!kbId) {
        alert("No keyboard is selected")
    }
    try {
        window.open(`https://keyman.com/keyboards/${kbId}`, 'blank', 'noopener, noreferrer')
    } catch (error) {
        console.error('Failed to Open the help URL: ', error)
        alert('Could not open the help documentation. Visit keyman.com/keyboard_name')
    }
}

function getKeymanWeb() 
{
    if(window.tavultesoft) {
      return window.tavultesoft.keymanweb;
    }
    return window.keyman;
}

var langExamples = [];
async function updateExample(kbdname) {
    var keymanExample=document.getElementById("example"),
    exampleBox=document.getElementById("exampleBox");
    if (!keymanExample || !exampleBox) return false;
  
    if(kbdname == '')
    {
      exampleBox.style.visibility='hidden';
      keymanExample.style.visibility='hidden';
      //keymanExample.innerHTML = 'Select a keyboard from the Keyboard Toolbar above';
      return true;
    }
  
    exampleBox.style.visibility='visible';
    keymanExample.style.visibility='visible';
    var activeLanguage = getKeymanWeb().getActiveLanguage();
    if(langExamples[activeLanguage + '_' + kbdname])
    {
      keymanExample.innerHTML = langExamples[activeLanguage + '_' + kbdname];
      return true;
    }
  
    langExamples[activeLanguage + '_' + kbdname] = 'Loading...';
      keymanExample.innerHTML = 'Loading...';
  
      const link = '/prog/languageexample.php?keyboard='+kbdname+'&language='+activeLanguage;
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
