// src/ts/main.ts
// Примітивні типи використовуються повсюди: string, number, boolean, HTMLElement | null, any[], etc.
import { setupModals } from './modules/modal';
import { setupScrollListener } from './modules/scroll';
import { setupRevealOnScroll } from './modules/reveal';
import { fetchAndShowPosts } from './modules/posts';
import './modules/templatemo';
// initialize
document.addEventListener('DOMContentLoaded', () => {
    setupModals();
    setupScrollListener();
    setupRevealOnScroll();
    fetchAndShowPosts();
});
