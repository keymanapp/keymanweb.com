/*
    === Keyboard Execution ===
*/
import { getKeyboard, setKeyboard } from "./handleKeyboardData.js";
import { highlightKbSelected } from "../feature/kb-selection-menu.js";

const textArea = document.getElementById('textArea')
const keymanExample = document.getElementById("example")
const exampleBox = document.getElementById("exampleBox")
let langExamples = [];

// Change and type keyboard
export async function setKeyboardToType() {
    if (!textArea) return

    const { kbdId, langCode, kbdName } = getKeyboard() // Get the keyboard data

    const langTag = `#${langCode}`
    const kbTag = kbdId.startsWith("Keyboard_") ? kbdId : `Keyboard_${kbdId}`
    
    if(kbdName) {
        textArea.placeholder = `The ${kbdName} keyboard is selected. Start typing...`
        searchInput.placeholder = "Selected: " + kbdName + " keyboard"
    }

    location.replace(`${langTag},${kbTag}`)

    await keyman.addKeyboards(kbdId)
    await keyman.setActiveKeyboard(kbdId, langCode)
    // const kbd = keyman.getKeyboard(kbdId, langCode)
    
    setTimeout(() => {
        applyClassToKb(), 0
    })
    
    // Update Example of enable the keyboard
    updateExample(kbdId)
    highlightKbSelected(kbdId)
    if(typeof(KeyboardChange_EmbedFonts) != 'undefined') KeyboardChange_EmbedFonts(kbdId)
}

// Language Examples
async function updateExample(kbdId) {
    if (!keymanExample || !exampleBox) return false;

    if(kbdId == '')
    {
        keymanExample.textContent = `No example is available due to empty Keyboard name.`
        return true;
    }

    let activeLanguage = keyman.getActiveLanguage();

    if(langExamples[activeLanguage + '_' + kbdId])
    {
        keymanExample.innerHTML = langExamples[activeLanguage + '_' + kbdId];
        return true;
    }
    
    langExamples[activeLanguage + '_' + kbdId] = 'Loading...';
    keymanExample.innerHTML = 'Loading...';

    const link = `/prog/languageexample.php?keyboard=${kbdId}&language=${activeLanguage}`;
    try {
        const response = await fetch(link);
        if(response.status == 200) {
            const content = await response.text();
            
            langExamples[activeLanguage + '_' + kbdId] = keymanExample.innerHTML = content;
        } else {
            throw new Error(`Unable to retrieve content, status was ${response.status}: ${response.statusText}`);
        }
    } catch(e) {
        langExamples[activeLanguage + '_' + kbdId] = keymanExample.innerHTML = 'Error retrieving example: '+e.message;
        throw e;
    }
}

// Apply classes to instructional keyboards
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
}
