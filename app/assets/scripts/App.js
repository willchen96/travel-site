import '../styles/styles.css'
import 'lazysizes'
import MobileMenu from '../scripts/modules/MobileMenu.js'
import ScrollReveal from '../scripts/modules/ScrollReveal.js'
import StickyHeader from '../scripts/modules/StickyHeader.js'


let modal
new MobileMenu
new ScrollReveal(document.querySelectorAll('.feature-item'), 0.25)
new ScrollReveal(document.querySelectorAll('.testimonial-item'), 0.25)
new StickyHeader

document.querySelectorAll('.modal__open').forEach((e) => {
    e.addEventListener('click', (e) => {
        e.preventDefault()
        if (modal == undefined) {
            import(/* webpackChunkName: "modal" */ '../scripts/modules/Modal.js').then((x) => {
                modal = new x.default()
                setTimeout(() => {
                    modal.openModal()
                }, 10);
            })
            .catch((e) => console.log(e))
        } else {
            modal.openModal()
        }
    })
})

if (module.hot) {
    module.hot.accept() //accept hot updates 
}