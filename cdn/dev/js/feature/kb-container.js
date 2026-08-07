/*
 * Keyman is copyright (C) SIL Global. MIT License.
 * 
 * Created by MengHeng Hav on 2026-06-26
 * 
 * element and interactions of the Keyboard containers
 */
import { selectedKbList } from "../state/appState.js"
import { kbData } from "../state/appState.js"
import { setKeyboard } from "../operation/keyboardDataPackage.js"
import { setKbHelpDocHamburger } from "../operation/hamburgerMenu.js"
import { firstKbToType, setKeyboardToType } from "../operation/keyboard.js"
import { kbDataForKbContainer } from "../operation/keyboardContainer.js"
import { kbConfigMenu } from "../operation/keyboardAction.js"

// UI for keyboard container
export function kbContainerUI(selectedKbList) {
    const kbContainerMenu = document.getElementById('keyboardContainerMenu')
    const kbContainerVisible = document.getElementById('keyboardContainerVisible')

    const kbOverflowBtn = document.getElementById("keyboardOverflowBtn")
    const kbMenuDropdown = document.getElementById('keyboardOverflowSelection')
    const kbOverflowSelection = document.getElementById("keyboardOverflowSelection")

    if (selectedKbList.length < 1) {
        resetKbContainer()
        return
    }
    
    firstKbToType(selectedKbList)
    
    const visibleItems = [] 
    const overflowItems = []
    const kbContainerWidth = kbContainerVisible.clientWidth
    let totalWidths = 0

    selectedKbList.forEach(kb => {
        kbContainerVisible.innerHTML = ''
        kbOverflowSelection.innerHTML = ''

        const kbChip = createKeyboardChip(kb)
        kbContainerVisible.appendChild(kbChip)

        let widths = Array.from(kbContainerVisible.children)
        .filter(child => child.nodeType === 1)
        .map(child => child.getBoundingClientRect().width)
        
        totalWidths += widths.reduce((a,b) => a+b, 0)

        kbChip.remove()

        if (totalWidths <= kbContainerWidth) {
            visibleItems.push(kb)
        } else {
            overflowItems.push(kb)
        }
        
        visibleItems.forEach(oneKb => {
            kbContainerVisible.appendChild(createKeyboardChip(oneKb))
        })

        overflowItems.forEach(oneKb => {
            kbOverflowSelection.appendChild(createKeyboardChip(oneKb))
        })

        if (overflowItems.length < 1) {
            kbOverflowBtn.classList.add('hidden')
            kbOverflowSelection.classList.add('hidden')
        } else {
            kbOverflowBtn.classList.remove('hidden')
            kbOverflowSelection.classList.remove('hidden')
        }
    }

)}

function createKeyboardChip(data) {
    const textArea = document.querySelector('#textArea')
    
    let kbdId = data.id
    let langCode = Object.keys(data.supportedLanguage)[0] || "en"
    let kbdName = data.name

    const kbDiv = document.createElement('div')
    kbDiv.classList.add('kb-item-keyboard')
    kbDiv.dataset.id = data.id

    // Keyboard Name
    const kbName = document.createElement('span')
    kbName.classList.add('kb-chip-name')
    kbName.textContent = data.name

    // Remove button
    const removeBtn = document.createElement('button')
    removeBtn.classList.add('kb-chip-remove')
    removeBtn.dataset.action = 'remove'
    removeBtn.dataset.id = data.id
    removeBtn.innerHTML = '&times;'

    // Selected indicator
    const selectedIndicator = document.createElement('div')
    selectedIndicator.classList.add('kb-chip-selected')
    const checkIcon = document.createElement('i')
    checkIcon.classList.add('fa-solid', 'fa-check')

    selectedIndicator.appendChild(checkIcon)

    kbDiv.appendChild(kbName)
    kbDiv.appendChild(removeBtn)
    kbDiv.appendChild(selectedIndicator)

    kbName.addEventListener('click', () => {
        kbdId = data.id
        langCode = Object.keys(data.supportedLanguage)[0] || "en"
        // Set the keyboard data for OSK to fetch for display
        setKeyboard(kbdId, langCode, kbdName)
        // Change the OSK
        setKeyboardToType()
        setKbHelpDocHamburger(kbdId, kbdName)
        reorderSelectedKbList(kbdId)
        textArea.focus()
    })

    // Remove keyboard
    removeBtn.addEventListener('click', (e) => {
        e.stopPropagation()
        kbConfigMenu(
            'remove',
            data.id,
            null
        )
    })

    const defaultKbUSParent = document.querySelector('.default-us-kb')
    const defaultKbUSGrandChild = defaultKbUSParent.children[0].children
    
    Array.from(defaultKbUSGrandChild).forEach(grandChild => {
        grandChild.addEventListener('click', (e) => {
            kbdId = "basic_kbdus"
            langCode = "en"
            kbdName = "US Basic"
            setKeyboard(kbdId, langCode, kbdName)
            setKeyboardToType()
        })
    })

    return kbDiv;
}

export function reorderSelectedKbList(kbId) {
    const index = selectedKbList.findIndex(
        kb => kb.id == kbId
    )

    if (index < 1) return

    selectedKbList.unshift(
        selectedKbList.splice(index, 1)[0]
    )

    kbContainerUI(selectedKbList)
}

// Set the keyboard selection menu to its default UI
function resetKbContainer() {
    const kbContainerVisible = document.getElementById("keyboardContainerVisible")
    kbContainerVisible.innerHTML = ''

    const kbMenuDropdown = document.getElementById('keyboardOverflowSelection')
    kbMenuDropdown.innerHTML = ''

    const kbOverMenuDropdownBtn = document.getElementById('keyboardOverflowBtn')
    kbOverMenuDropdownBtn.classList.add('hidden')
}

// UI for Keyboard Selected Limitation
export function kbContainerLimits(onAccept) {
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
        kbContainerUI(selectedKbList)
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

// Highlight the keyboard in the Keyboard Container
export function highlightKbContainer(kbId) {
    document.querySelectorAll('.kb-item-keyboard').forEach(el => {
        el.classList.remove('kb-item-keyboard-selected')
    })

    const kbSelectedItem = document.querySelector(`[data-id=${kbId}]`)
    if (kbSelectedItem) {
        kbSelectedItem.classList.add('kb-item-keyboard-selected')
    }
}

// Compare and remove keyboard
export function removeFromKbContainer(kbId) {
    if(!kbId) return
    let filtered = selectedKbList.filter(kb => kb.id !== kbId)
    
    // Reset and re-enter the Keyboard selection menu
    selectedKbList.length = 0
    selectedKbList.push(...filtered)
}
