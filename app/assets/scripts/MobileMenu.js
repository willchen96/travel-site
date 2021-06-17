class MobileMenu {
    constructor() {
        this.menu = document.querySelector(".site-header")
        this.menuIcon = document.querySelector(".site-header__menu-icon")
        this.menuContent = document.querySelector(".site-header__menu-content")
        this.events();
    }
    events() {
        this.menuIcon.addEventListener('click', () => this.toggleTheMenu())
    }

    toggleTheMenu() {
        console.log('icon clicked')
        this.menu.classList.toggle("site-header--background--visible")
        this.menuContent.classList.toggle("site-header__menu-content--visible")
        this.menuIcon.classList.toggle("site-header__menu-icon--close")
    }

}

export default MobileMenu;