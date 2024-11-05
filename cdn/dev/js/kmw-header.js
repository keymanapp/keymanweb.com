function showMenuList(e) {
    e.classList.toggle("change")
    var menu = document.getElementById("menu-list")
    if(menu.style.display == "none") {
        menu.style.display = "block"
    } else {
        menu.style.display = "none"
    }
}
