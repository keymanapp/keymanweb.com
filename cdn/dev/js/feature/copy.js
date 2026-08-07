/*
 * Keyman is copyright (C) SIL Global. MIT License.
 * 
 * Created by MengHeng Hav on 2026-08-05
 * 
 * element and interaction for the copy tool
 */
export function copyTool() {
    // Copy tool
    const copyDiv = document.querySelector('#copyTool')
    const copyBtn = copyDiv.children[0]
    
    copyDiv?.addEventListener('click', async function() {
        let textToCopy = textArea.value.trim()
        
        // Show X icon when there's no text to copy
        if(!textToCopy) {
            copyBtn.classList.replace('fa-copy', 'fa-xmark')
            setTimeout(() => {
                copyBtn.classList.replace('fa-xmark', 'fa-copy')
                copyBtn.textContent = ''
            }, 3000)
            return;
        }

        await navigator.clipboard.writeText(textToCopy)

        // Once copied, the icon shows a check mark
        copyBtn.classList.replace('fa-copy', 'fa-check');
        
        // After copied, the icon goes back to its default
        setTimeout(() => {
            copyBtn.classList.replace('fa-check', 'fa-copy');
        }, 1000);
    })
}