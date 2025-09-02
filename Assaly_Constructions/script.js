let lastScrollTop = 0;
const header = document.querySelector('.head_assaly');

window.addEventListener('scroll', function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
        // Scrolling down
        header.classList.add('hide-header');
    } else {
        // Scrolling up
        header.classList.remove('hide-header');
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Avoid negative scroll
}, false);