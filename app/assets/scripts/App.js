import '../styles/styles.css'
import MobileMenu from '../scripts/modules/MobileMenu.js'
import ScrollReveal from '../scripts/modules/ScrollReveal.js'

let mm = new MobileMenu;
let scrollRevealFeatures = new ScrollReveal(document.querySelectorAll('.feature-item'), 0.25)
let scrollRevealTestimonials = new ScrollReveal(document.querySelectorAll('.testimonial-item'), 0.25)

if (module.hot) {
    module.hot.accept() //accept hot updates 
}