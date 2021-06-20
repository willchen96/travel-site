import '../styles/styles.css'
import 'lazysizes'
import MobileMenu from '../scripts/modules/MobileMenu.js'
import ScrollReveal from '../scripts/modules/ScrollReveal.js'
import StickyHeader from '../scripts/modules/StickyHeader.js'
import Modal from '../scripts/modules/Modal.js'


let mm = new MobileMenu
new ScrollReveal(document.querySelectorAll('.feature-item'), 0.25)
new ScrollReveal(document.querySelectorAll('.testimonial-item'), 0.25)
new StickyHeader
new Modal

if (module.hot) {
    module.hot.accept() //accept hot updates 
}