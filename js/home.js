document.addEventListener('DOMContentLoaded', function() {
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


    const aboutLink = document.querySelector('a[href="#about"]');

    // Add click event listener
    aboutLink.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default anchor behavior

        // Get the target section
        const aboutSection = document.getElementById('about');

        // Scroll to the section smoothly
        aboutSection.scrollIntoView({
            behavior: 'smooth'
        });
    });
});