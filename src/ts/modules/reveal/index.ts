export function setupRevealOnScroll(): void {
  const revealElems = Array.from(document.querySelectorAll('.reveal-on-scroll')) as HTMLElement[];
  function check(): void {
    const windowHeight = window.innerHeight;
    revealElems.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < windowHeight - 50) el.classList.add('visible');
    });
  }
  window.addEventListener('scroll', check);
  window.addEventListener('resize', check);
  check();
}
