// Platform Supports (Icons, OS names)
export function platformSupport(data) {
    const platformMap = {
        android: "Android",
        desktopWeb: "Web",
        ios: "iPhone and iPad",
        linux: "Linux",
        macos: "macOS",
        mobileWeb: "Mobile web",
        windows: "Windows"
    }
    let platformSpan = Object.entries(data)
        .filter(([_, supportLevel]) => supportLevel == 'full')
        .map(([platform]) => `<span class="platform-${platform.toLowerCase()}" title="${platformMap[platform]}">${platformMap[platform]}</span>`).join('')      
        
    return platformSpan
}