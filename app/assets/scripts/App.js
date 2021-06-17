import '../styles/styles.css'
import MobileMenu from '../scripts/MobileMenu.js'

let mm = new MobileMenu;

if (module.hot) {
    module.hot.accept() //accept hot updates 
}