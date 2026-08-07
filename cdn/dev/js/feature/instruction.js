/*
 * Keyman is copyright (C) SIL Global. MIT License.
 * 
 * Created by MengHeng Hav on 2026-06-29
 * 
 * element and interactions of the Instruction dialog.
 */

export function showPopUpDialog(ele) {
    if (!ele) return

    // Open modal
    ele.classList.remove('hidden')

    // Close button
    const closeBtn = ele.querySelector('#instructionModalCloseBtn')

    closeBtn?.addEventListener('click', () => {
        ele.classList.add('hidden')
    })

    // Close when clicking outside modal content
    ele.addEventListener('click', (e) => {
        if (e.target === ele) {
            ele.classList.add('hidden')
        }
    })

    // Close with ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            ele.classList.add('hidden')
        }
    })
}