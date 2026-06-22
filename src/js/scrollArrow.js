window.addEventListener('scroll', function () {
    const scrollArrow = document.getElementById('scrollArrow');
    if (scrollArrow) {
        if (window.scrollY > 50) {
            scrollArrow.classList.add('project-hero__scroll-indicator--hidden');
        } else {
            scrollArrow.classList.remove('project-hero__scroll-indicator--hidden');
        }
    }
});

document.getElementById('scrollArrow').addEventListener('click', function () {
    const overviewSection = document.querySelector('.project-overview');
    if (overviewSection) {
        overviewSection.scrollIntoView({ behavior: 'smooth' });
    }
});