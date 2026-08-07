
/*
 * Keyman is copyright (C) SIL Global. MIT License.
 * 
 * Created by MengHeng Hav on 2026-08-07
 * 
 * Check URL
*/
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