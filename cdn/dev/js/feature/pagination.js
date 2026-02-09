// UI for Pagination
import { getKeyboardList } from "../operation/searchAPI.js"
import { searchState } from "../state/appState.js"
import { searchKeyboard } from "../operation/searchLogic.js"

/* Pagination */
const prevBtn = document.getElementById('prevPage')
const nextBtn = document.getElementById('nextPage')
const pageInfo = document.getElementById('pageInfo')

export function updatePaginationCtrl() {
    pageInfo.textContent = `${searchState.currentPage} of ${searchState.totalPage}` // Number of Total page
    nextBtn.disabled = searchState.currentPage >= searchState.totalPage // Check to disable next page
    prevBtn.disabled = searchState.currentPage <= 1 // Check to disable previous page
}

export function goPrevPage() {
    if (searchState.currentPage > 1) {
        searchState.currentPage--
        searchKeyboard(searchState.searchQuery, searchState.currentPage)
    }
}

export function goNextPage() {
    if (searchState.currentPage < searchState.totalPage) {
        searchState.currentPage++
        searchKeyboard(searchState.searchQuery, searchState.currentPage)
    }
}

// Load keyboard search info (pages)
export async function loadPageInfo(defaultQuery = "p:popular") {
    const data = await getKeyboardList(defaultQuery) // depending on the query

    if (data?.context) {
        searchState.totalPage = data.context.totalPages || 1;
        searchState.currentPage = data.context.pageNumber || 1;
    } else {
        searchState.totalPage = Math.ceil(data.keyboards.length / searchState.itemPerPage);
    }

    updatePaginationCtrl()
}
