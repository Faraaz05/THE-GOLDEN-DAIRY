document.addEventListener('DOMContentLoaded', function() {   
    /*About us animation*/
    const aboutItems = document.querySelectorAll('.about-item');

    function checkScroll() {
        aboutItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            const itemBottom = item.getBoundingClientRect().bottom;

            if (itemTop < window.innerHeight && itemBottom > 0) {
                item.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', checkScroll);
    checkScroll();

    /* About Scroll*/
    const aboutLink = document.querySelector('a[href="#about"]');

    aboutLink.addEventListener('click', function(e) {
        e.preventDefault(); 
       
        const aboutSection = document.getElementById('about');

        aboutSection.scrollIntoView({
            behavior: 'smooth'
        });
    });
});