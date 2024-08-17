    document.addEventListener('DOMContentLoaded', function() {   
    /*About us animation*/
    const aboutItems = document.querySelectorAll('.about-item');
    console.log(aboutItems);

    const header = document.querySelector('header');
    const sloganDiv = document.querySelector('.slogan');

    function checkScroll() {
        aboutItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            const itemBottom = item.getBoundingClientRect().bottom;

            if (itemTop < window.innerHeight && itemBottom > 0) {
                item.classList.add('visible');
            }
        });

        const sloganBottom = sloganDiv.getBoundingClientRect().bottom;

        if(sloganBottom < 0) {
            const headerHeight = header.offsetHeight;
            document.body.style.paddingTop = `${headerHeight}px`;
            header.classList.add('fixed');  
            console.log(headerHeight);
        }
        else {
            header.classList.remove('fixed');  
            document.body.style.paddingTop = `0px`;
        }
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