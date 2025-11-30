export function setupScrollListener() {
    const header = document.querySelector('header');
    if (!header)
        return;
    window.addEventListener('scroll', () => {
        const y = window.scrollY;
        if (y > 50)
            header.classList.add('scrolled');
        else
            header.classList.remove('scrolled');
    });
}
