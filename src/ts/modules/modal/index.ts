import { qs, qsa } from '../dom';

export function openModal(modal: HTMLElement): void {
  modal.classList.add('is-open');
  modal.style.display = 'flex';
  modal.setAttribute('aria-hidden', 'false');
  const focusable = modal.querySelector<HTMLElement>('button, [href], input, textarea, [tabindex]');
  if (focusable) focusable.focus();
}

export function closeModal(modal: HTMLElement): void {
  modal.classList.remove('is-open');
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true');
}

export function setupModals(): void {
  const openModalButtonsSelector = '[data-open-modal]';
  const closeModalButtonsSelector = '[data-close-modal]';
  const modalSelector = '.modal';
  qsa(openModalButtonsSelector).forEach(btn => {
    btn.addEventListener('click', (e) => {
      const target = (e.currentTarget as HTMLElement).getAttribute('data-open-modal');
      if (!target) return;
      const modal = qs(target);
      if (modal) openModal(modal);
    });
  });
  qsa(closeModalButtonsSelector).forEach(btn => {
    btn.addEventListener('click', (e) => {
      const modal = (e.currentTarget as HTMLElement).closest(modalSelector) as HTMLElement | null;
      if (modal) closeModal(modal);
    });
  });
  qsa(modalSelector).forEach(m => {
    m.addEventListener('click', (e) => {
      if (e.target === m) closeModal(m);
    });
  });
  document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Escape') qsa(modalSelector).forEach(m => closeModal(m));
  });
}
