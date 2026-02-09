import { selectedKbList } from "../state/appState.js"
import { platformSupport } from "../operation/platformSupport.js"
import { setKeyboard } from "../operation/handleKeyboardData.js"
import { removeKbSelected, setKbHelpDocHamburger } from "../operation/selectedKb.js"
import { checkKbCardUI } from "./search.js"
import { setKeyboardToType } from "../operation/keyboard.js"
import { confirmAndAddKb } from "../operation/confirmKeyboard.js"
import { bundleKbDataforSelectionMenu } from "../operation/bundleKbSelectionMenu.js"
import { kbConfigMenu } from "../operation/keyboardDetails.js"

export function addKbToSelectionMenu(kbIconPTag, element, kb, data) {
    const keyboardSelectionButton = document.getElementById('keyboardSelectionButton')

    let isSelected = selectedKbList.some(selected => selected.id == kb.id) // Check which keyboard is already in the keyboard selection menu
    
    // Remove keyboard
    if (isSelected) {
        removeKbSelected(kb.id) 
        kbIconPTag.textContent = '+'
        generateKbUI(selectedKbList) // Generate Keyboard selection menu UI
        checkKbCardUI(kbIconPTag, element, kb) // Disable or Enable Keyboard Search card UI
        
        return
    }
    
    if(selectedKbList.length < 5) { // if keyboard selection menu has less than 5 keyboards
        bundleKbDataforSelectionMenu(kb) // continue to add it to the menu
        generateKbUI(selectedKbList)
        kbIconPTag.textContent = '✓'
        kbIconPTag.classList.add('kb-icon-plus-animate')

        setTimeout(() => {
            kbIconPTag.textContent = '-'
            kbIconPTag.classList.remove('kb-icon-plus-animate')
            keyboardSelectionButton.classList.remove('btn-secondary')
            keyboardSelectionButton.classList.add('btn-keyman-orange')
        }, 800)
        
        checkKbCardUI(kbIconPTag, element, kb) 
        return
    } 
    // if the keyboards in the selection menu are over 5, there's a confirmation needed before adding the keyboard
    confirmAndAddKb(() => {
        bundleKbDataforSelectionMenu(kb)
        generateKbUI(selectedKbList)
        
        kbIconPTag.textContent = '✓'
        kbIconPTag.classList.add('kb-icon-plus-animate')

        setTimeout(() => {
            kbIconPTag.textContent = '-'
            kbIconPTag.classList.remove('kb-icon-plus-animate')
            keyboardSelectionButton.classList.remove('btn-secondary')
            keyboardSelectionButton.classList.add('btn-keyman-orange')
        }, 800)
        checkKbCardUI(kbIconPTag, element, kb)
        setKeyboardToType()
        textArea.focus()
    })
}

// UI for keyboard selection menu
export function generateKbUI(selectedKbList) {
    const textArea = document.querySelector('#textArea')
    const keyboardSelection = document.getElementById("keyboardSelection")
    keyboardSelection.innerHTML = ''

    // Check if keyboard selection menu has less than 1 keyboard
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
        kbDiv.classList.add("kb-item-keyboard")
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

        let kbdId = data.id
        let langCode = Object.keys(data.supportedLanguage)[0] || "en"
        let kbdName = data.name

        highlightKbSelected(kbdId)

        setKeyboard(kbdId, langCode, kbdName) // Set the data to display the keyboard
        // Each tools on each of the keyboard in the selection menu
        kbConfigList.addEventListener('click', (e) => {
            const target = e.target
            if (target.tagName == 'I' && target.dataset.action) {
                const action = target.dataset.action
                const id = target.dataset.id
                const helpLink = target.dataset.helplink
                kbConfigMenu(action, id, helpLink)   
            }
        })
        
        // Click on the keyboard will enable the keyboard for typing
        kbName.addEventListener('click', () => {
            kbdId = data.id
            langCode = Object.keys(data.supportedLanguage)[0] || "en"
            setKeyboard(kbdId, langCode, kbdName)
            setKeyboardToType()
            setKbHelpDocHamburger(kbdId, kbdName)
            highlightKbSelected(kbdId)
            keyboardSelection.classList.remove('open')
            textArea.focus()
        })

        // Default English keyboard
        kbDivFoot.onclick = () => {
            setKeyboard('basic_kbdus', 'en', 'US Basic')
            setKeyboardToType()
        }
    })
    triggerKbCount(selectedKbList)
}

// Keyboard count for Keyboard selection menu
export function triggerKbCount(selectedKbList) {
    const kbSelectedLength = selectedKbList.length
    const keyboardSelectionButton = document.querySelector('#keyboardSelectionButton') 
    const keyboardCount = document.querySelector('#kbCount')
    
    if (kbSelectedLength >= 1) {
        keyboardCount.classList.remove('fa-caret-right')
        keyboardCount.textContent = `${kbSelectedLength}` // Show the number of keyboard in the menu
        keyboardSelectionButton.classList.add('btn-keyman-orange')
        keyboardSelectionButton.classList.remove('btn-secondary')
    } else {
        keyboardCount.classList.add('fa-caret-right')
        keyboardCount.textContent = ''
        keyboardSelectionButton.classList.remove('btn-keyman-orange')
        keyboardSelectionButton.classList.add('btn-secondary')
    }
}

// Set the keyboard selection menu to its default UI
function resetKbSelectionMenu() {
    const keyboardSelection = document.querySelector("#keyboardSelection")

    const kbDivHeader = document.createElement('div')
    kbDivHeader.textContent = "Keyboard Selection menu"
    kbDivHeader.classList.add('kb-item-header')

    const kbItem = document.createElement('div')
    kbItem.classList.add('.kb-item-keyboard')

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

// UI for Keyboard Selected Limitation
export function limitKbSelectionUI(onAccept) {
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

// Keyboard details for Keyboard selection menu
function displayKbDetails(data) {
    const item = selectedKbList.find(kb => kb.id == data.id)
    if (!item) return;

    const kbDetails = document.createElement('div')
    kbDetails.classList.add('keyboard-details')
    kbDetails.setAttribute('id', `keyboard-${data.id}-details`)
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

// Highlight an enabled keyboard in the Keyboard Selection Menu
export function highlightKbSelected(id) {
    document.querySelectorAll('.kb-item-keyboard').forEach(el => {
        el.style.backgroundColor = ''
        el.style.color = ''
        el.style.opacity = ''
    })

    const kbSelectedItem = document.getElementById(id)
    if (kbSelectedItem) {
        kbSelectedItem.style.backgroundColor = 'var(--keyman-orange)'
        kbSelectedItem.style.color = 'white'
        kbSelectedItem.style.opacity = '100%'
    }
}