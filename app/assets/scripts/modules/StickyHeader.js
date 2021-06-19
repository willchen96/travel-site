import throttle from 'lodash/throttle'

export default class StickyHeader {
    constructor () {
        this.header = document.querySelector('.site-header');
        this.els = document.querySelectorAll('#our-beginning, #features, #testimonials, .large-hero')
        this.stick()
        this.setupIntersectionObserver()
    }

    stick() {
        document.addEventListener('scroll', throttle(() => {           
            if(window.scrollY > 60) {
                this.header.classList.add('site-header--sticky')
            } else {
                this.header.classList.remove('site-header--sticky')
            }
        }, 200))        
    }


    setupIntersectionObserver() {
        let options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        }

        let callback = (entries, observer) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    return
                }

                if (entry.target.id != '') {
                    const link = entry.target.getAttribute('data-matching-link')
                    document.querySelector(link).classList.add('highlight')
                    document.querySelectorAll(`.primary-nav a:not(${link})`).forEach((e) => e.classList.remove('highlight'))
                    
                } else {
                    document.querySelector('#our-beginning-link').classList.remove('highlight')
                }
                
                
            
            })
        }
          
        let observer = new IntersectionObserver(callback, options)


        this.els.forEach(el => observer.observe(el))
    }
}