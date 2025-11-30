export function setupRevealOnScroll() {
    const revealElems = Array.from(document.querySelectorAll('.reveal-on-scroll'));
    function check() {
        const windowHeight = window.innerHeight;
        revealElems.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < windowHeight - 50)
                el.classList.add('visible');
        });
    }
    window.addEventListener('scroll', check);
    window.addEventListener('resize', check);
    check();
}
