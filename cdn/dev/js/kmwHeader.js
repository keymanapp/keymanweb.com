dropdownItems = [
    {
        text: 'Brao (SIL) Keyboard', 
        href: '#'
    },
    {
        text: 'Bunong (SIL) Keyboard', 
        href: '#'
    },
    {
        text: 'Khmer Angkor Keyboard', 
        href: '#'
    },
    {
        text: 'Khmer (SIL) Keyboard', 
        href: '#'
    }
]

// Draft
    // [
    //     {
    //         language: 'Khmer',
    //         keyboards: [
    //             'Brao (SIL)',
    //             'Bunong (SIL)'
                
    //         ]
    //     }
    // ]
// 
function function1() {
    const dropdownMenu = document.getElementById('dropdown-menu');
    dropdownMenu.innerHTML = ''; // Clear existing items

    // Create 10 rows with 4 columns each
    for (let i = 1; i <= 5; i++) {
        const rowDiv = document.createElement('div')
        rowDiv.classList.add('row'); 

        for (let j = 1; j <= 4; j++) {
            const colDiv = document.createElement('div');
            colDiv.classList.add('col');

            for(let k = 1; k<=4; k++) {

                let li = document.createElement('li')
                li.classList.add('dropdown-submenu')
                li.textContent = "Khmer"

                const subUl = document.createElement('ul')
                subUl.classList.add('dropdown-menu')
                    dropdownItems.forEach(element => {
                    const subLi = document.createElement('li')
                    subLi.classList.add('dropdown-item')
                    subLi.setAttribute('id', element.text)
                    subLi.textContent = element.text
                    subUl.appendChild(subLi)

                    subLi.addEventListener('click', function () {
                        alert(`You clicked on: ${element.text}`);
                        populateSelectedKeyboard('Khmer')
                    });
                    });
                
                li.appendChild(subUl)
                colDiv.appendChild(li)
            }
            
            rowDiv.appendChild(colDiv);
        }

        dropdownMenu.appendChild(rowDiv);
    }
}

function populateSelectedKeyboard(language) {
    let selectedKeyboard = document.getElementById('selectedKeyboard')
    selectedKeyboard.innerHTML = ''

    const rowDiv = document.createElement('div')
    rowDiv.classList.add('row'); 

    const colDiv = document.createElement('div');
    colDiv.classList.add('col');

    let li = document.createElement('li')
    li.classList.add('dropdown-submenu')
    li.textContent = "Khmer"

    const subUl = document.createElement('ul')
    subUl.classList.add('dropdown-menu')
    
    const subLi = document.createElement('li')
    dropdownItems.forEach(element => {
        const subLi = document.createElement('li')
        subLi.classList.add('dropdown-item')
        subLi.setAttribute('id', element.text)
        subLi.textContent = element.text
        subUl.appendChild(subLi)
    })
    
    subUl.appendChild(subLi)
    
    li.appendChild(subUl)
    colDiv.appendChild(li)
    
    rowDiv.appendChild(colDiv);
            
    selectedKeyboard.appendChild(rowDiv)
}