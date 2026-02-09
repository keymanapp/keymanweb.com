// Logic for Search
import { searchState } from "../state/appState.js";
import { getKeyboardList } from "./searchAPI.js";
import { updatePaginationCtrl } from "../feature/pagination.js";
import { updateSearchIcon } from "../feature/search.js"
import { displaySearch } from "../feature/search.js";
import { loadPageInfo } from "../feature/pagination.js";

export async function handleSearch(value) {
    let query = value
    setQuery(query)
    updateSearchIcon(query) 

    // Check the query's character number 
    if (!searchState.searchQuery || searchState.searchQuery.length < 2) {
        await defaultSearch()
        return
    }

    loadPageInfo(searchState.searchQuery)
    
    await searchKeyboard(searchState.searchQuery, searchState.currentPage)
}

// Contain a value for searching
export function setQuery(value = '') {
    searchState.searchQuery = value
    searchState.currentPage = 1
}

// Run the search with queries and current page
export async function runSearch() {
    const currentQuery = searchState.searchQuery
    const currentPage = searchState.currentPage
    
    const data = await getKeyboardList(`${encodeURIComponent(currentQuery)}&p=${currentPage}`)

    if (data.context) {
        searchState.totalPage = data.context.totalPages || 1;
        searchState.currentPage = data.context.pageNumber || 1;
    } else {
        searchState.totalPage = Math.ceil(data.keyboards.length / searchState.itemPerPage);
    }

    return data
}

/* Search */
const kbSearchCard = document.getElementById('kbSearchCardUI')
/* Display top downloads with search Instruction */
export async function defaultSearch() {
    kbSearchCard.innerHTML = `<span>Please wait. It's Loading...</span>` // Loading UI

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
export async function searchKeyboard(query = null, page) {
    kbSearchCard.innerHTML = `<div>Searching ${query}...</div>` // Loading UI
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
