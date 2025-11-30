"use strict";
// src/ts/templatemo-prism-scripts.ts
// Converted from templatemo-prism-scripts.js to TypeScript
const portfolioData = [
    { id: 1, title: 'Neural Network', description: 'Advanced AI system...', image: 'assets/images/neural-network.jpg', tech: ['TensorFlow', 'Python', 'CUDA'] },
    { id: 2, title: 'Quantum Cloud', description: 'Next-generation cloud infrastructure...', image: 'assets/images/quantum-cloud.jpg', tech: ['AWS', 'Kubernetes', 'Docker'] },
    { id: 3, title: 'Blockchain Vault', description: 'Secure decentralized storage...', image: 'assets/images/blockchain-vault.jpg', tech: ['Ethereum', 'Solidity', 'Web3'] },
    { id: 4, title: 'Cyber Defense', description: 'Military-grade cybersecurity framework...', image: 'assets/images/cyber-defense.jpg', tech: ['Zero Trust', 'AI Defense', 'Encryption'] },
    { id: 5, title: 'Data Nexus', description: 'Big data processing platform...', image: 'assets/images/data-nexus.jpg', tech: ['Apache Spark', 'Hadoop', 'Kafka'] },
    { id: 6, title: 'AR Interface', description: 'Augmented reality system...', image: 'assets/images/ar-interface.jpg', tech: ['Unity', 'ARCore', 'Computer Vision'] },
    { id: 7, title: 'IoT Matrix', description: 'Intelligent IoT ecosystem...', image: 'assets/images/iot-matrix.jpg', tech: ['MQTT', 'Edge AI', '5G'] }
];
const skillsData = [
    { name: 'React.js', icon: '⚛️', level: 95, category: 'frontend' },
    { name: 'Node.js', icon: '🟢', level: 90, category: 'backend' },
    { name: 'TypeScript', icon: '📘', level: 88, category: 'frontend' },
    { name: 'AWS', icon: '☁️', level: 92, category: 'cloud' },
    { name: 'Docker', icon: '🐳', level: 85, category: 'cloud' },
    { name: 'Python', icon: '🐍', level: 93, category: 'backend' },
    { name: 'Kubernetes', icon: '☸️', level: 82, category: 'cloud' },
    { name: 'GraphQL', icon: '◈', level: 87, category: 'backend' },
    { name: 'TensorFlow', icon: '🤖', level: 78, category: 'emerging' },
    { name: 'Blockchain', icon: '🔗', level: 75, category: 'emerging' },
    { name: 'Vue.js', icon: '💚', level: 85, category: 'frontend' },
    { name: 'MongoDB', icon: '🍃', level: 90, category: 'backend' }
];
// Helper qs/qsa are defined in src/ts/main.ts to avoid duplication
// Scroll to section function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    const header = document.getElementById('header');
    if (section && header) {
        const headerHeight = header.offsetHeight;
        const targetPosition = section.offsetTop - headerHeight;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
}
// Particles
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer)
        return;
    const particleCount = 15;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (18 + Math.random() * 8) + 's';
        particlesContainer.appendChild(particle);
    }
}
// Carousel
let currentIndex = 0;
const carousel = document.getElementById('carousel');
const indicatorsContainer = document.getElementById('indicators');
function createCarouselItem(data, index) {
    const item = document.createElement('div');
    item.className = 'carousel-item';
    item.dataset.index = index.toString();
    const techBadges = data.tech.map(tech => `<span class="tech-badge">${tech}</span>`).join('');
    item.innerHTML = `
        <div class="card">
            <div class="card-number">0${data.id}</div>
            <div class="card-image">
                <img src="${data.image}" alt="${data.title}" loading="lazy" onerror="this.style.display='none'">
            </div>
            <h3 class="card-title">${data.title}</h3>
            <p class="card-description">${data.description}</p>
            <div class="card-tech">${techBadges}</div>
            <button class="card-cta" id="explore-${index}">Explore</button>
        </div>
    `;
    return item;
}
function initCarousel() {
    if (!carousel || !indicatorsContainer)
        return;
    portfolioData.forEach((data, index) => {
        const item = createCarouselItem(data, index);
        carousel.appendChild(item);
        const indicator = document.createElement('div');
        indicator.className = 'indicator';
        if (index === 0)
            indicator.classList.add('active');
        indicator.dataset.index = index.toString();
        indicator.addEventListener('click', () => goToSlide(index));
        indicatorsContainer.appendChild(indicator);
        // attach Explore button click to scroll to 'about' section
        const exploreBtn = item.querySelector(`#explore-${index}`);
        exploreBtn === null || exploreBtn === void 0 ? void 0 : exploreBtn.addEventListener('click', () => scrollToSection('about'));
    });
    updateCarousel();
}
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
function nextSlide() { currentIndex = (currentIndex + 1) % portfolioData.length; updateCarousel(); }
function prevSlide() { currentIndex = (currentIndex - 1 + portfolioData.length) % portfolioData.length; updateCarousel(); }
function goToSlide(index) { currentIndex = index; updateCarousel(); }
// Skills grid
function initSkillsGrid() {
    const skillsGrid = document.getElementById('skillsGrid');
    const categoryTabs = document.querySelectorAll('.category-tab');
    if (!skillsGrid)
        return;
    function displaySkills(category = 'all') {
        if (!skillsGrid)
            return;
        skillsGrid.innerHTML = '';
        const filteredSkills = category === 'all' ? skillsData : skillsData.filter(s => s.category === category);
        filteredSkills.forEach((skill, index) => {
            const hex = document.createElement('div');
            hex.className = 'skill-hexagon';
            hex.style.animationDelay = `${index * 0.1}s`;
            hex.innerHTML = `
                <div class="hexagon-inner">
                    <div class="hexagon-content">
                        <div class="skill-icon-hex">${skill.icon}</div>
                        <div class="skill-name-hex">${skill.name}</div>
                        <div class="skill-level"><div class="skill-level-fill" style="width: ${skill.level}%"></div></div>
                        <div class="skill-percentage-hex">${skill.level}%</div>
                    </div>
                </div>
            `;
            skillsGrid.appendChild(hex);
        });
    }
    categoryTabs.forEach(tab => tab.addEventListener('click', () => { categoryTabs.forEach(t => t.classList.remove('active')); tab.classList.add('active'); displaySkills(tab.dataset.category || 'all'); }));
    displaySkills();
}
// Carousel controls, auto-rotate, keyboard, resize
document.addEventListener('DOMContentLoaded', () => {
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    nextBtn === null || nextBtn === void 0 ? void 0 : nextBtn.addEventListener('click', nextSlide);
    prevBtn === null || prevBtn === void 0 ? void 0 : prevBtn.addEventListener('click', prevSlide);
    setInterval(nextSlide, 5000);
    document.addEventListener('keydown', (e) => { if (e.key === 'ArrowLeft')
        prevSlide(); if (e.key === 'ArrowRight')
        nextSlide(); });
    let resizeTimeout;
    window.addEventListener('resize', () => { clearTimeout(resizeTimeout); resizeTimeout = window.setTimeout(() => updateCarousel(), 250); });
    initCarousel();
    initSkillsGrid();
    initParticles();
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    menuToggle === null || menuToggle === void 0 ? void 0 : menuToggle.addEventListener('click', () => { navMenu === null || navMenu === void 0 ? void 0 : navMenu.classList.toggle('active'); menuToggle.classList.toggle('active'); });
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => { if (header) {
        if (window.scrollY > 100)
            header.classList.add('scrolled');
        else
            header.classList.remove('scrolled');
    } });
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.addEventListener('click', (e) => {
        var _a;
        e.preventDefault();
        const targetId = (_a = link.getAttribute('href')) === null || _a === void 0 ? void 0 : _a.substring(1);
        const targetSection = targetId ? document.getElementById(targetId) : null;
        if (targetSection && header) {
            const headerHeight = header.offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            navMenu === null || navMenu === void 0 ? void 0 : navMenu.classList.remove('active');
            menuToggle === null || menuToggle === void 0 ? void 0 : menuToggle.classList.remove('active');
        }
    }));
    function updateActiveNav() {
        const scrollPosition = window.scrollY + 100;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            if (sectionId && scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => { var _a; link.classList.remove('active'); const href = (_a = link.getAttribute('href')) === null || _a === void 0 ? void 0 : _a.substring(1); if (href === sectionId)
                    link.classList.add('active'); });
            }
        });
    }
    window.addEventListener('scroll', updateActiveNav);
    function animateCounter(element) {
        const target = parseInt(element.dataset.target || '0', 10);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        const counter = window.setInterval(() => { current += step; if (current >= target) {
            element.textContent = String(target);
            window.clearInterval(counter);
        }
        else {
            element.textContent = String(Math.floor(current));
        } }, 16);
    }
    const observerOptions = { threshold: 0.5, rootMargin: '0px 0px -100px 0px' };
    const observer = new IntersectionObserver((entries) => { entries.forEach(entry => { if (entry.isIntersecting) {
        const statNumbers = entry.target.querySelectorAll('.stat-number');
        statNumbers.forEach(number => { if (!number.classList.contains('animated')) {
            number.classList.add('animated');
            animateCounter(number);
        } });
    } }); }, observerOptions);
    const statsSection = document.querySelector('.stats-section');
    if (statsSection)
        observer.observe(statsSection);
    const contactForm = document.getElementById('contactForm');
    contactForm === null || contactForm === void 0 ? void 0 : contactForm.addEventListener('submit', (e) => { e.preventDefault(); const formData = new FormData(contactForm); const data = Object.fromEntries(formData); alert(`Thank you ${data.name}! Your message has been transmitted successfully. We'll respond within 24 hours.`); contactForm.reset(); });
    window.addEventListener('load', () => { setTimeout(() => { const loader = document.getElementById('loader'); loader === null || loader === void 0 ? void 0 : loader.classList.add('hidden'); }, 1500); });
    window.addEventListener('scroll', () => { const scrolled = window.pageYOffset; const parallax = document.querySelector('.hero'); if (parallax)
        parallax.style.transform = `translateY(${scrolled * 0.5}px)`; });
});
