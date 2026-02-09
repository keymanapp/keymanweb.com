import { selectedKbList } from "../state/appState.js"

// Add keyboard for kb search and selection UI
export function bundleKbDataforSelectionMenu(kb) {
    const kbInfo = {
        "id": kb.id,
        "name": kb.name,
        "version": kb.version,
        "helpLink": kb.helpLink,
        "platformSupport": kb.platformSupport,
        "totalDownloads": kb.match.totalDownloads,
        "sourcePath": kb.sourcePath,
        "supportedLanguage": kb.languages,
        "lastUpdated": kb.lastModifiedDate
    }
    
    selectedKbList.push(kbInfo)
}