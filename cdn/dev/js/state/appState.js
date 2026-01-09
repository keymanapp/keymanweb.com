/*      Text area values
            - To resize
*/
export const textAreaState = {
    isTextAreaFullHeight: false,
    fullHeightTextArea: 95,
    defaultHeightTextArea: 35,
    defaultHeightKb: 47
}

/*
        Keyboard values
        - To resize
        - To change height
*/
export const keyboardResizing = {
    isResizing: false,
    startY: 0,
    startHeightTop: 0,
    startHeightBottom: 0
}

/*
        Selected Keyboard Data
        - To Enable keyboard for typing
        - Change the language example
        - Update the UI after the keyboard is generated
*/
export const kbData = {
    kbdId: "basic_kbdus",
    langCode: "en",
    kbdName: "US Basic"
}

/* 
        Main array for Keyboards Selection Menu:
        - The interaction between search, kb selection menu...etc
        - The enabling of a keyboard for typing
        - Data = [
            "id": kb.id,
            "name": kb.name,
            "version": kb.version,
            "helpLink": kb.helpLink,
            "platformSupport": kb.platformSupport,
            "totalDownloads": kb.match.totalDownloads,
            "sourcePath": kb.sourcePath,
            "supportedLanguage": kb.languages,
            "lastUpdated": kb.lastModifiedDate
        ]
*/
export const selectedKbList = []

/*      Pagination
        - Current Page
        - Total Page
        - Search Queries
        - Timer to pause searching/loading API
*/
export const searchState = {
    currentPage: 1,
    totalPage: 1,
    itemPerPage: 10,
    searchQuery: "",
    debounceTimer: null
}