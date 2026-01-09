import { searchState } from "../state/appState.js"

// Pagination Previous Page
export function goPrevPage() {
    if (searchState.currentPage > 1) {
        searchState.currentPage--
        searchKeyboard(searchState.currentQuery, searchState.currentPage)
    }
}

// Pagination Next Page
export function goNextPage() {
    if (searchState.currentPage < searchState.totalPage) {
        searchState.currentPage++
        searchKeyboard(searchState.currentQuery, searchState.currentPage)
    }
}
