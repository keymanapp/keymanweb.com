// Calling search API with a custom parameter/query

const api = 'https://api.keyman.com/search/2.0'

export async function getKeyboardList(customQuery = "p:popular") {
    let response = await fetch(`${api}?q=${customQuery}`)
    if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`)
    }
    return response.json()
}
