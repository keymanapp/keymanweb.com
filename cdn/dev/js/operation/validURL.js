// Ensure a valid URL
export function validateURL(string) {
    try {
        const newUrl = new URL(string)
        if (newUrl.protocol === 'https:') {
            return newUrl
        } else {
            return false
        }
    } catch (error) {
        console.error(error)
    }
}