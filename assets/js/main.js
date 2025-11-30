"use strict";
// src/ts/main.ts
// Примітивні типи використовуються повсюди: string, number, boolean, HTMLElement | null, any[], etc.
const modalSelector = ".modal";
const openModalButtonsSelector = "[data-open-modal]";
const closeModalButtonsSelector = "[data-close-modal]";
const postsEndpoint = "https://jsonplaceholder.typicode.com/posts?_limit=5";
function qs(selector) {
    return document.querySelector(selector);
}
function qsa(selector) {
    return Array.from(document.querySelectorAll(selector));
}
// Modal open/close
function openModal(modal) {
    modal.classList.add("is-open");
    // simple focus management
    const focusable = modal.querySelector("button, [href], input, textarea, [tabindex]");
    if (focusable)
        focusable.focus();
}
function closeModal(modal) {
    modal.classList.remove("is-open");
}
function setupModals() {
    qsa(openModalButtonsSelector).forEach(btn => {
        btn.addEventListener("click", (e) => {
            const target = e.currentTarget.getAttribute("data-open-modal");
            if (!target)
                return;
            const modal = qs(target);
            if (modal)
                openModal(modal);
        });
    });
    qsa(closeModalButtonsSelector).forEach(btn => {
        btn.addEventListener("click", (e) => {
            const modal = e.currentTarget.closest(modalSelector);
            if (modal)
                closeModal(modal);
        });
    });
    // close modal on overlay click
    qsa(modalSelector).forEach(m => {
        m.addEventListener("click", (e) => {
            if (e.target === m)
                closeModal(m);
        });
    });
    // ESC key closes modal
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            qsa(modalSelector).forEach(m => closeModal(m));
        }
    });
}
// Scroll listener: header shadow toggle
function setupScrollListener() {
    const header = qs("header");
    if (!header)
        return;
    window.addEventListener("scroll", () => {
        const y = window.scrollY;
        if (y > 50)
            header.classList.add("scrolled");
        else
            header.classList.remove("scrolled");
    });
}
// Simple animation: reveal elements on scroll
function setupRevealOnScroll() {
    const revealElems = qsa(".reveal-on-scroll");
    function check() {
        const windowHeight = window.innerHeight;
        revealElems.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < windowHeight - 50)
                el.classList.add("visible");
        });
    }
    window.addEventListener("scroll", check);
    window.addEventListener("resize", check);
    check();
}
// Fetch posts and display them
async function fetchAndShowPosts() {
    try {
        const res = await fetch(postsEndpoint);
        if (!res.ok)
            throw new Error("Network response was not ok");
        const posts = await res.json();
        const container = qs("#posts");
        if (!container)
            return;
        posts.forEach((p) => {
            const article = document.createElement("article");
            article.classList.add("post");
            article.innerHTML = `<h3>${p.title}</h3><p>${p.body}</p><button class='open-post' data-postid='${p.id}'>Details</button>`;
            container.appendChild(article);
        });
        // add listeners for details buttons
        qsa(".open-post").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const idStr = e.currentTarget.getAttribute("data-postid");
                if (!idStr)
                    return;
                const postId = Number(idStr);
                showPostDetails(postId);
            });
        });
    }
    catch (err) {
        console.error("Fetch failed", err);
    }
}
function showPostDetails(postId) {
    // find the post data element and show modal with details
    const modal = qs("#postModal");
    if (!modal)
        return;
    // naive approach: fetch single post
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        .then(r => r.json())
        .then((p) => {
        const body = modal.querySelector(".modal-body");
        if (body)
            body.innerHTML = `<h2>${p.title}</h2><p>${p.body}</p>`;
        openModal(modal);
    });
}
// initialize
document.addEventListener("DOMContentLoaded", () => {
    setupModals();
    setupScrollListener();
    setupRevealOnScroll();
    fetchAndShowPosts();
});
