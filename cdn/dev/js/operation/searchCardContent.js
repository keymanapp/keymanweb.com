// Logic of search query highlights

// Highlight word searched
export function getMarkedContext(query) {
    let escapedTerm = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // Mark the query
    return new RegExp(escapedTerm, 'i')
}

// Find a match between Search Context and Language, Keyboard name, Description
export function highlightSearchContext(kb, marked) {
    let matchFound = false
    let matchField = ""
    let matchValue = ""

    // Get and find language that matches the search
    for (let lang in kb.languages) {
        let langData = kb.languages[lang]
        for (let key in langData) {
            const value = langData[key]
            if (typeof value == "string" && marked.test(value)) {
                matchFound = true
                matchValue = value.replace(marked, (m) => m ? `<mark>${m}</mark>` : m)
                matchField = "language"
                break
            }
        }
        if (matchFound) break
    }

    // Find a match for keyboard name if language is not a match
    if (!matchFound && marked.test(kb.name)) {
        matchFound = true
        matchValue = kb.name.replace(marked, '<mark>$&</mark>')
        matchField = "keyboard"
    }

    // Find a match for keyboard description if name is not a match
    if (!matchFound && marked.test(kb.description)) {
        matchFound = true
        matchField = "description"
    }

    return {matchField, matchValue, matchFound}
}

// Display Highlighted Search Context
export function showMarkedContext(kb, matchField, matchValue) {
    const kbNameHeading = document.createElement('h4')

    // Display matched language
    const langNameSpan = document.createElement('span')
    langNameSpan.style.fontSize = "14px"
    if (matchField == "language") {
        langNameSpan.innerHTML = matchField == "language" ? ` (${matchValue} language)` : ""
    }

    // Display matched keyboard
    if (matchField == "keyboard") {
        kbNameHeading.innerHTML = matchValue
    } else {
        kbNameHeading.textContent =  kb.name
    }
    kbNameHeading.appendChild(langNameSpan)

    return kbNameHeading
}

// Truncated Keyboard Description
export function truncateDesc(kb, matchField, marked) {
    const kbDescHeading = document.createElement('h6')
    kbDescHeading.classList.add("keyboard-description")
    const wordLimits = 90

    let temp = document.createElement('div')
    temp.innerHTML = kb.description

    let fullDesc = kb.description
    let plainText = temp.textContent
    let shortText = ""

    let isTruncated = false

    let firstPara = firstParagraph(fullDesc)

    if (plainText.length >= wordLimits) {
        shortText = plainText.slice(0, wordLimits) + "..."
        kbDescHeading.innerHTML = shortText
        isTruncated = true  
    } else {
        kbDescHeading.innerHTML = firstPara
        isTruncated = false
    }

    // Toggle show more & show less
    if (isTruncated) {
        const toggleBtn = document.createElement('a')
        toggleBtn.href = "#"
        toggleBtn.style.marginLeft = "6px"
        toggleBtn.textContent = "Show more"

        toggleBtn.addEventListener('click', e => {
            e.preventDefault()
            const isExpanded = toggleBtn.textContent == "Show more"
            kbDescHeading.innerHTML = !isExpanded ? shortText.replace(marked, (m) => m ? `<mark>${m}</mark>` : m) : firstPara
            if (matchField == 'description') {
                kbDescHeading.innerHTML = isExpanded ? firstPara.replace(marked, '<mark>$&</mark>') : shortText
            }
            kbDescHeading.style.color = isExpanded ? 'black' : 'gray'
            toggleBtn.textContent = isExpanded ? "Show less" : "Show more"
            kbDescHeading.appendChild(toggleBtn)
        })
        kbDescHeading.appendChild(toggleBtn)
    }
    
    return kbDescHeading
}

// Show first Paragraph for Keyboard Description (Copied from keyman.com)
function firstParagraph(text) {
  // Yes, this is HTML parsing by regexp, but we will survive the apocalypse!
  const firstPara = /^(((?:.|[\r\n])+?)(<\/p>|<br>))/m.exec(text);
  if(!firstPara) {
    // No paragraph markers (e.g. legacy .keyboard_info files); it is a plain
    // text description, so we stop at first newline marker
    const firstPlainTextPara = /^(.+?)(\r|\n|$)/.exec(text);
    const html = $('<p>').text(firstPlainTextPara ? firstPlainTextPara[1] : text)[0].outerHTML;
    return html;
  }
  if(firstPara[3] == '<br>') {
    // We stop at first <br>, so will miss the end of paragraph, so close the
    // tag ourselves
    return firstPara[2] + '</p>';
  }
  // Return the whole paragraph
  return firstPara[1];
}