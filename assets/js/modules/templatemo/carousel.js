export function initCarousel(portfolioData) {
    let currentIndex = 0;
    const carousel = document.getElementById('carousel');
    const indicatorsContainer = document.getElementById('indicators');
    if (!carousel || !indicatorsContainer)
        return;
    function updateCarousel() {
        const items = document.querySelectorAll('.carousel-item');
        const indicators = document.querySelectorAll('.indicator');
        const totalItems = items.length;
        const isMobile = window.innerWidth <= 768;
        const isTablet = window.innerWidth <= 1024;
        items.forEach((it, idx) => {
            const item = it;
            let offset = idx - currentIndex;
            if (offset > totalItems / 2)
                offset -= totalItems;
            else if (offset < -totalItems / 2)
                offset += totalItems;
            const absOffset = Math.abs(offset);
            const sign = offset < 0 ? -1 : 1;
            item.style.transform = '';
            item.style.opacity = '';
            item.style.zIndex = '';
            item.style.transition = 'all 0.8s cubic-bezier(0.4, 0.0, 0.2, 1)';
            let spacing1 = 400, spacing2 = 600, spacing3 = 750;
            if (isMobile) {
                spacing1 = 280;
                spacing2 = 420;
                spacing3 = 550;
            }
            else if (isTablet) {
                spacing1 = 340;
                spacing2 = 520;
                spacing3 = 650;
            }
            if (absOffset === 0) {
                item.style.transform = 'translate(-50%, -50%) translateZ(0) scale(1)';
                item.style.opacity = '1';
                item.style.zIndex = '10';
            }
            else if (absOffset === 1) {
                item.style.transform = `translate(-50%, -50%) translateX(${sign * spacing1}px) translateZ(-200px) rotateY(${-sign * (isMobile ? 25 : 30)}deg) scale(${isMobile ? 0.88 : 0.85})`;
                item.style.opacity = '0.8';
                item.style.zIndex = '5';
            }
            else if (absOffset === 2) {
                item.style.transform = `translate(-50%, -50%) translateX(${sign * spacing2}px) translateZ(-350px) rotateY(${-sign * (isMobile ? 35 : 40)}deg) scale(${isMobile ? 0.75 : 0.7})`;
                item.style.opacity = '0.5';
                item.style.zIndex = '3';
            }
            else if (absOffset === 3) {
                item.style.transform = `translate(-50%, -50%) translateX(${sign * spacing3}px) translateZ(-450px) rotateY(${-sign * (isMobile ? 40 : 45)}deg) scale(${isMobile ? 0.65 : 0.6})`;
                item.style.opacity = '0.3';
                item.style.zIndex = '2';
            }
            else {
                item.style.transform = 'translate(-50%, -50%) translateZ(-500px) scale(0.5)';
                item.style.opacity = '0';
                item.style.zIndex = '1';
            }
        });
        indicators.forEach((indicator, idx) => (indicator.classList.toggle('active', idx === currentIndex)));
    }
    function createCarouselItem(data, index) {
        const item = document.createElement('div');
        item.className = 'carousel-item';
        item.dataset.index = index.toString();
        const techBadges = data.tech.map((tech) => `<span class="tech-badge">${tech}</span>`).join('');
        item.innerHTML = `
      <div class="card">
        <div class="card-number">0${data.id}</div>
        <div class="card-image"><img src="${data.image}" alt="${data.title}" loading="lazy" onerror="this.style.display='none'"></div>
        <h3 class="card-title">${data.title}</h3>
        <p class="card-description">${data.description}</p>
        <div class="card-tech">${techBadges}</div>
        <button class="card-cta">Explore</button>
      </div>
    `;
        return item;
    }
    // init
    portfolioData.forEach((data, index) => {
        const it = createCarouselItem(data, index);
        carousel.appendChild(it);
        const indicator = document.createElement('div');
        indicator.className = 'indicator';
        if (index === 0)
            indicator.classList.add('active');
        indicator.dataset.index = index.toString();
        indicator.addEventListener('click', () => { currentIndex = index; updateCarousel(); });
        indicatorsContainer.appendChild(indicator);
    });
    updateCarousel();
    // auto-rotate
    setInterval(() => { currentIndex = (currentIndex + 1) % portfolioData.length; updateCarousel(); }, 5000);
}
export default initCarousel;
