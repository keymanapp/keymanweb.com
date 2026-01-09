export function eraserTool() {
    const eraseDiv = document.querySelector('#eraseTool')
    const eraseBtn = eraseDiv.children[0]

    eraseDiv?.addEventListener('click', function() {
        let value = textArea.value.trim();
        
        // Show X icon when there's no text to erase
        if(!value) {
            eraseBtn.classList.replace('fa-eraser', 'fa-xmark');
            setTimeout(() => {
                eraseBtn.classList.replace('fa-xmark', 'fa-eraser');
            }, 3000);
            return;
        } else {
            confirmAndClearText(() => {
            // This function is passed as onConfirmErase

            textArea.value = '';
            // Once erased, the icon shows a check mark
            eraseBtn.classList.replace('fa-eraser', 'fa-check');
            // After erased, the icon goes back to its default
            setTimeout(() => {
                eraseBtn.classList.replace('fa-check', 'fa-eraser');
            }, 1000);
        });
        }
    })

    // Check to erase all text
    function confirmAndClearText(onConfirmErase) {
        if (typeof onConfirmErase !== 'function') {
            console.log("Expected onConfirmErase a function, got:", typeof onConfirmErase);
            alert("Click on the keyboard again to enable.");
            return;
        }

        const overlay = eraseTextUI(() => {
            onConfirmErase();
        });

        document.body.appendChild(overlay);
    }

    // UI for Keyboard Selected Limitation
    function eraseTextUI(onDelete) {
        const overlay = document.createElement('div');
        overlay.classList.add('dialog-overlay');

        // Dialog box
        const dialog = document.createElement('div');
        dialog.classList.add('dialog-box');

        const icon = document.createElement('div');
        icon.classList.add('dialog-icon');
        icon.textContent = "⚠️"

        const title = document.createElement('h2');
        title.classList.add('dialog-title');
        title.textContent = 'Clear all text?';

        const message = document.createElement('p');
        message.classList.add('dialog-message');
        message.textContent = 'Are you sure? This action cannot be undone.';

        const btnContainer = document.createElement('div');
        btnContainer.classList.add('dialog-buttons');

        const cancelBtn = document.createElement('button');
        cancelBtn.classList.add('btn-cancel');
        cancelBtn.textContent = 'Cancel';
        cancelBtn.onclick = () => overlay.remove();

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('btn-delete');
        deleteBtn.textContent = 'Erase';
        deleteBtn.onclick = () => {
            deleteBtn.disabled = true
            overlay.remove();
            onDelete?.();
        };

        btnContainer.append(cancelBtn, deleteBtn);
        dialog.append(icon, title, message, btnContainer);
        overlay.append(dialog);

        return overlay;
    }
}