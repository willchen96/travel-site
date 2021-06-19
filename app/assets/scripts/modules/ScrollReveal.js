export default class ScrollReveal {
    constructor(els, threshold) {
        this.itemsToReveal = els
        this.threshold = threshold
        this.setupIntersectionObserver()
    }

    setupIntersectionObserver() {
        let options = {
            root: null,
            rootMargin: '0px',
            threshold: this.threshold
        }

        let callback = (entries, observer) => {
            entries.forEach(entry => {
                
                if (!entry.isIntersecting) {
                    return
                }
                entry.target.classList.add('visible')

                observer.unobserve(entry.target)
            })
        }
          
        let observer = new IntersectionObserver(callback, options)

        this.itemsToReveal.forEach(el => observer.observe(el))
    }
}

