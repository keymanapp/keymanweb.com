languages = [
    {
    language: "Achterhoeks",
    keyboard:
        [
            {
                name: 'EuroLatin (SIL)',
                script: '',
            },
        ]
    },
    {
    language: "Finnish",
    keyboard:
        [
            {
                name: 'Finnish Basic',
                script: 'fi',
            },
            {
                name: 'Finnish-Swidish with Sami-Basic',
                script: 'fi',
            },
            {
                name: 'Malar Braille',
                script: 'fi-brai',
            }
        ]
    },
    {
    language: "Khmer",
    keyboard:
        [
            {
                name: 'Khmer Basic',
                script: 'km',
            },
            {
                name: 'Khmer (NIDA) Basic',
                script: 'km',
            },
            {
                name: 'Khmer Advanced',
                script: 'km',
            },
            {
                name: 'Khmer Angkor',
                script: 'km',
            },
            {
                name: 'Khmer (SIL)',
                script: 'km',
            }
        ]
    },
    {
    language: "Rotokas",
    keyboard:
        [
            {
                name: 'US Basic',
                script: 'roo-latn',
            },
            {
                name: 'Xpert',
                script: 'roo-latn',
            }
        ]
    },
    {
    language: "Sogdian",
    keyboard:
        [
            {
                name: 'Manichaean',
                script: 'sog-mani',
            },
            {
                name: 'Old Sogdian',
                script: 'sog-sogo',
            },
            {
                name: 'Sogdian Phonetic',
                script: 'sog',
            },
        ]
    }
]

// Global Variables
let selectedLanguagesList = []
const keyboardSelectionButton = document.getElementById('keyboardSelectionButton')

const keyboardTabBtn = document.getElementById('keyboardTab')
keyboardTabBtn.innerHTML = ''

let totalSelectedLanguage = 5;
let languageAmount

function getTotalSelectedLanguage(languageCount) {
    languageAmount = languageCount.length
    return languageAmount
}

function languageSearch() {
    const languageSearchList = document.getElementById('languageSearchList');
    languageSearchList.innerHTML = ''; // Clear existing items

    languages.forEach((lang) => {
        let languageFoundInList = selectedLanguagesList.some(selected => selected.language === lang.language)
        
        let cardWrap = document.createElement('div')
        cardWrap.classList.add('card-wrap'); 
        cardWrap.onclick = () => populateSelectedKeyboard(lang.language)
        if (languageFoundInList) {
            cardWrap.classList.add('disabled')
            cardWrap.style.color = 'gray'
            cardWrap.style.pointerEvents = 'none';
        } else {
            cardWrap.onclick = () => populateSelectedKeyboard(lang.language)
        }
        let cardHeader = document.createElement('div')
        cardHeader.classList.add('card-header')
        let languageHeader = document.createElement('h4')
        languageHeader.textContent = `${lang.language}`
        let languageScript = document.createElement('p')
        languageScript.textContent = 'script'

        cardHeader.appendChild(languageHeader)
        cardHeader.appendChild(languageScript)

        let languageKeyboard = document.createElement('h6')
        languageKeyboard.textContent = "Keyboard: Number of keyboard"
        let languageDesc = document.createElement('h6')
        languageDesc.textContent = "The language description?"

        cardWrap.appendChild(cardHeader)
        cardWrap.appendChild(languageKeyboard)
        cardWrap.appendChild(languageDesc)

        languageSearchList.appendChild(cardWrap)
    })
}

function populateSelectedKeyboard(language = null) {
    getTotalSelectedLanguage(selectedLanguagesList)
    if(language) {
        let selectedLanguage = languages.find(lang => lang.language === language)
        if (!selectedLanguagesList.some(lang => lang.language === language)) {
            selectedLanguagesList.push({
                language: selectedLanguage.language,
                keyboards: selectedLanguage.keyboard
            })
        }
    }    
    // Create the Language List
    generateLangKbUI(selectedLanguagesList)
    // Create the Language Toggle Button
    generateLangTabUI(selectedLanguagesList)
    // Always Show the first Language
    setKbSelectionVisibility(selectedLanguagesList)
}

function generateLangKbUI(langProperties) {
    const keyboardSelectionList = document.getElementById("keyboardSelectionList")
    keyboardSelectionList.innerHTML = ''
    if (langProperties.length) {
        keyboardSelectionButton.classList.remove('btn-secondary')
        keyboardSelectionButton.classList.add('btn-danger')
    } 
    else {
        keyboardSelectionButton.classList.remove('btn-danger')
        keyboardSelectionButton.classList.add('btn-secondary')
        const noKbPTag = document.createElement('p')
        noKbPTag.textContent = "Open Search to get your keyboard"
        keyboardSelectionList.appendChild(noKbPTag)
    }
    langProperties.forEach(lang => {
        // Language Parent tags
        const languageDiv = document.createElement('div')
        languageDiv.classList.add(lang.language)
        languageDiv.classList.add('hidden')
        languageDiv.setAttribute('id', `${lang.language}`)
    
        // First child of Language Parent Tag
        const languageNameDiv = document.createElement('div')
        languageNameDiv.classList.add('language-name')
        // Language and their keyboards tags
        const languageHeading = document.createElement('h3')
        languageHeading.textContent = lang.language
        
        const languageRemovalIcon = document.createElement('i')
        languageRemovalIcon.classList.add('fa-solid','fa-minus')
        languageRemovalIcon.setAttribute('id', 'removeLanguage')
        languageRemovalIcon.onclick = () => removeLanguage(lang.language)
    
        languageNameDiv.appendChild(languageHeading)
        languageNameDiv.appendChild(languageRemovalIcon)
        
        // Second child of Language Parent Tag
        const keyboardListDiv = document.createElement('div')
        keyboardListDiv.classList.add('keyboard-list')
    
        const keyboardUl = document.createElement('ul')
        lang.keyboards.forEach(kb  => {
            const keyboardLi = document.createElement('li')
            keyboardLi.setAttribute('id', `${kb.name} keyboard`)
            keyboardLi.textContent = `${kb.name} [${kb.script}]`
            keyboardLi.onclick = () => selectKeyboardToType(kb.name)
    
            const keyboardInfoIcon = document.createElement('i')
            keyboardInfoIcon.classList.add('fa-solid', 'fa-circle-info')
            keyboardInfoIcon.onmouseover = () => getKeyboardInfo(kb.name)
    
            keyboardLi.appendChild(keyboardInfoIcon)
            keyboardUl.appendChild(keyboardLi)
            keyboardListDiv.appendChild(keyboardUl)
        })
        languageDiv.appendChild(languageNameDiv)
        languageDiv.appendChild(keyboardListDiv)
            
        keyboardSelectionList.appendChild(languageDiv)
    })
}

function generateLangTabUI(language) {
    keyboardTabBtn.innerHTML = ''
    language.forEach(i => {
        const languageTabPara = document.createElement('p')
        languageTabPara.classList.add("language-tab")
        languageTabPara.setAttribute('id', `${i.language}-tab`)
        languageTabPara.textContent = `${i.language}`
        languageTabPara.onclick = () => toggleDifferentLang(i.language)
        keyboardTabBtn.appendChild(languageTabPara)
    }) 
}

function setKbSelectionVisibility(language) {
    for (i=0; i<=language.length; i++) {
        if (i == 0) {
            let element = language[i]
            langTab = document.getElementById(`${element.language}-tab`)
            langKb = document.getElementById(element.language)
            langKb.classList.remove('hidden')
            langTab.style.opacity = "100%"
            langTab.style.color = "white"
        }
    }
}

function toggleDifferentLang(language) {
    const keyboardSelectionListChild = document.getElementById("keyboardSelectionList").children
    const languageTab = document.getElementById("keyboardTab").children
    // Toggle between Language Tabs
    for (element of languageTab) {
        if (element.id == `${language}-tab`) {
            element.classList.add("keyboardTab-animation")
            element.style.opacity = "100%"
            element.style.color = "white"
            element.style.backgroundColor = "var(--keyman-red)"
        } else {
            element.style.opacity = "50%"
            element.style.color = "white"
        }
        setTimeout(() => {
            element.classList.remove("keyboardTab-animation")
        }, 1000)
    }
    // Response to the Toggling of Language Tabs
    for (element of keyboardSelectionListChild) {
        if (element.id == language) {
            element.classList.add("keyboardSelection-animation")
            element.classList.remove('hidden')
        } else {
            element.classList.add('hidden')
        }
        setTimeout(() => {
            element.classList.remove("keyboardSelection-animation")
        }, 1000)
    }
}

const textArea = document.getElementById('textArea')
function selectKeyboardToType(keyboard) {
    textArea.classList.add("textarea-animation")
    textArea.placeholder = `The ${keyboard} Keyboard is selected. Please start typing...`
    setTimeout(() => {
        textArea.classList.remove("textarea-animation")
    }, 500)
}

function removeLanguage(language) {
    selectedLanguagesList = selectedLanguagesList.filter(lang => lang.language !== language)
    populateSelectedKeyboard()
}
