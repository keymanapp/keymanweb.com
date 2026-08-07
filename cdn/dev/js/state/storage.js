/*
 * Keyman is copyright (C) SIL Global. MIT License.
 * 
 * Created by MengHeng Hav on 2026-08-07
 * 
 * Save and restore the rememberState data to localStorage
*/
const STORAGE_KEY = "keymanWebStorage"

export const storage = {
    set(key, value, time = null) {
        const item = {
            value,
            expiry: time ? Date.now() + time : null
        };
        window.localStorage.setItem(key, JSON.stringify(item))
    },

    get(key) {
        const raw = window.localStorage.getItem(key)

        if (!raw) return null;

        try {
            const item = JSON.parse(raw)

            if (item.expiry && Date.now() > item.expiry) {
                window.localStorage.removeItem(key)
                return null
            }

            return item.value
        }
        catch {
            return null
        }
    },

    remove(key) {
        window.localStorage.removeItem(key)
    }
}