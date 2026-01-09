$(document).ready(function() {
    let searchInstructionIsON = true
    $('#toggleSearchInstructionBtn').addClass('btn-primary').text('Visible')
    function updateInstructionUI(state) {
        searchInstructionIsON = state

        if (searchInstructionIsON) {
            $('.search-instruction, #hrForKeyboard').fadeIn('200')
            $('#toggleSearchInstructionBtn').removeClass('btn-secondary').addClass('btn-primary').text('Visible')
            $('#searchInput').click()
            $('#searchDropdownMenu').show()
        } else {
            $('.search-instruction, #hrForKeyboard').fadeOut('200')
            $('#toggleSearchInstructionBtn').removeClass('btn-primary').addClass('btn-secondary').text('Hidden')
            $('#searchDropdownMenu').show()
            $('#searchInput').click()
        }
    }

    $('#closeInstruction').click( () => {
        if (searchInstructionIsON) updateInstructionUI(false)
    })

    $('#toggleSearchInstructionBtn').on('click', () => {
        updateInstructionUI(!searchInstructionIsON)
    })
})