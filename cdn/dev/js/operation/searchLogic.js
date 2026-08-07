/*
 * Keyman is copyright (C) SIL Global. MIT License.
 * 
 * Created by MengHeng Hav on 2026-08-07
 * 
 * Search logic behind the search input
 */
import { searchState } from "../state/appState.js";
import { getKeyboardList } from "./searchAPI.js";
import { updatePaginationCtrl } from "../feature/pagination.js";
import { updateSearchIcon } from "../feature/search.js"
import { displaySearch } from "../feature/search.js";
import { getTotalPage } from "../feature/pagination.js";

/* Search */
const kbSearchCard = document.getElementById('kbSearchCardUI')
let searchTimeout = null

export async function handleSearch(rawQuery) {
    let query = rawQuery.target.value

    // Check the query's character number 
    if (!query || query.length < 2) {
        await defaultSearch()
        return
    }

    updateSearchIcon(query)

    searchState.searchQuery = query // update query
    searchState.currentPage = 1

    clearTimeout(searchTimeout) 
    
    searchTimeout = setTimeout(async () => {
        await getTotalPage(query)

        searchKbWithQuery(query, searchState.currentPage)
    }, 300)
}

/* Display top downloads with search Instruction */
export async function defaultSearch() {
    kbSearchCard.innerHTML = `<span>The most popular keyboards are loading...</span>` // Loading UI

    let data = await getKeyboardList('p:popular') // Show top 10 most downloaded keyboards

    if(searchState.searchQuery) return

    let mostDownloadkb = data.keyboards
    
    // Check data
    if (!mostDownloadkb || !Array.isArray(mostDownloadkb)) { 
        throw new Error(`Invalid API response structure`)
    }

    displaySearch(mostDownloadkb) // Keyboard search UI
}

/* Get query and return search */
export async function searchKbWithQuery(query = null, page) {
    kbSearchCard.innerHTML = `<div>Searching for ${query}...</div>` // Loading UI
    kbSearchCard.style.display = 'block'

    let data = await getKeyboardList(`${encodeURIComponent(query)}&p=${page}`)

    // Validate data.keyboards
    if (!data.keyboards || !Array.isArray(data.keyboards)) {
        throw new Error("Invalid API response structure")
    }
    
    if (data.context) {
        searchState.currentPage = data.context.pageNumber
        searchState.totalPage = data.context.totalPages
    }

    displaySearch(data.keyboards, data.context.totalRows, query)
    updatePaginationCtrl()
}
