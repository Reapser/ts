import { qs, qsa } from '../dom/index.js';
export function openModal(modal) {
    modal.classList.add('is-open');
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
    const focusable = modal.querySelector('button, [href], input, textarea, [tabindex]');
    if (focusable)
        focusable.focus();
}
export function closeModal(modal) {
    modal.classList.remove('is-open');
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
}
export function setupModals() {
    const openModalButtonsSelector = '[data-open-modal]';
    const closeModalButtonsSelector = '[data-close-modal]';
    const modalSelector = '.modal';
    qsa(openModalButtonsSelector).forEach((btn) => {
        btn.addEventListener('click', (e) => {
            const target = e.currentTarget.getAttribute('data-open-modal');
            if (!target)
                return;
            const modal = qs(target);
            if (modal)
                openModal(modal);
        });
    });
    qsa(closeModalButtonsSelector).forEach((btn) => {
        btn.addEventListener('click', (e) => {
            const modal = e.currentTarget.closest(modalSelector);
            if (modal)
                closeModal(modal);
        });
    });
    qsa(modalSelector).forEach((m) => {
        m.addEventListener('click', (e) => {
            if (e.target === m)
                closeModal(m);
        });
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape')
            qsa(modalSelector).forEach(m => closeModal(m));
    });
}
