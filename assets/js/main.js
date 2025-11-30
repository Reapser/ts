// src/ts/main.ts
// Примітивні типи використовуються повсюди: string, number, boolean, HTMLElement | null, any[], etc.
import { setupModals } from './modules/modal/index.js';
import { setupScrollListener } from './modules/scroll/index.js';
import { setupRevealOnScroll } from './modules/reveal/index.js';
import { fetchAndShowPosts } from './modules/posts/index.js';
import './modules/templatemo/index.js';
// initialize
document.addEventListener('DOMContentLoaded', () => {
    setupModals();
    setupScrollListener();
    setupRevealOnScroll();
    fetchAndShowPosts();
});
