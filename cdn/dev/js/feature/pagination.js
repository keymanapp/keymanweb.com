/*
 * Keyman is copyright (C) SIL Global. MIT License.
 * 
 * Created by MengHeng Hav on 2026-08-05
 * 
 * Element and interaction for the pagination
 */
import { getKeyboardList } from "../operation/searchAPI.js"
import { searchState } from "../state/appState.js"
import { searchKbWithQuery } from "../operation/searchLogic.js"

/* Pagination */
const prevBtn = document.getElementById('prevPage')
const nextBtn = document.getElementById('nextPage')
const pageInfo = document.getElementById('pageInfo')

export function goPrevPage() {
    if (searchState.currentPage > 1) {
        searchState.currentPage--
        searchKbWithQuery(searchState.searchQuery, searchState.currentPage)
    }
}

export function goNextPage() {
    if (searchState.currentPage < searchState.totalPage) {
        searchState.currentPage++
        searchKbWithQuery(searchState.searchQuery, searchState.currentPage)
    }
}

// Load keyboard search info (pages)
export async function getTotalPage(defaultQuery = "p:popular") {
    const data = await getKeyboardList(defaultQuery) // depending on the query

    if (data?.context) {
        searchState.totalPage = data.context.totalPages || 1;
        searchState.currentPage = data.context.pageNumber || 1;
    } else {
        searchState.totalPage = Math.ceil(data.keyboards.length / searchState.itemPerPage);
    }

    updatePaginationCtrl()
}

export function updatePaginationCtrl() {
    pageInfo.textContent = `${searchState.currentPage} of ${searchState.totalPage}` // Number of Total page
    nextBtn.disabled = searchState.currentPage >= searchState.totalPage // Check to disable next page
    prevBtn.disabled = searchState.currentPage <= 1 // Check to disable previous page
}
