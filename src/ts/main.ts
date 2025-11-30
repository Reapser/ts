// src/ts/main.ts
// Примітивні типи використовуються повсюди: string, number, boolean, HTMLElement | null, any[], etc.

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

const modalSelector: string = ".modal";
const openModalButtonsSelector: string = "[data-open-modal]";
const closeModalButtonsSelector: string = "[data-close-modal]";
const postsEndpoint: string = "https://jsonplaceholder.typicode.com/posts?_limit=5";

function qs(selector: string): HTMLElement | null {
  return document.querySelector(selector) as HTMLElement | null;
}

function qsa(selector: string): HTMLElement[] {
  return Array.from(document.querySelectorAll(selector)) as HTMLElement[];
}

// Modal open/close
function openModal(modal: HTMLElement): void {
  // Make modal visible via class + inline style for robustness
  modal.classList.add("is-open");
  modal.style.display = 'flex';
  modal.setAttribute('aria-hidden', 'false');
  // simple focus management
  const focusable = modal.querySelector<HTMLElement>("button, [href], input, textarea, [tabindex]");
  if (focusable) focusable.focus();
}

function closeModal(modal: HTMLElement): void {
  modal.classList.remove("is-open");
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true');
}

function setupModals(): void {
  qsa(openModalButtonsSelector).forEach(btn => {
    btn.addEventListener("click", (e: Event) => {
      const target = (e.currentTarget as HTMLElement).getAttribute("data-open-modal");
      if (!target) return;
      const modal = qs(target);
      if (modal) openModal(modal);
    });
  });

  qsa(closeModalButtonsSelector).forEach(btn => {
    btn.addEventListener("click", (e: Event) => {
      const modal = (e.currentTarget as HTMLElement).closest(modalSelector) as HTMLElement | null;
      if (modal) closeModal(modal);
    });
  });

  // close modal on overlay click
  qsa(modalSelector).forEach(m => {
    m.addEventListener("click", (e: Event) => {
      if (e.target === m) closeModal(m as HTMLElement);
    });
  });

  // ESC key closes modal
  document.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      qsa(modalSelector).forEach(m => closeModal(m));
    }
  });
}

// Scroll listener: header shadow toggle
function setupScrollListener(): void {
  const header = qs("header");
  if (!header) return;
  window.addEventListener("scroll", () => {
    const y: number = window.scrollY;
    if (y > 50) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  });
}

// Simple animation: reveal elements on scroll
function setupRevealOnScroll(): void {
  const revealElems = qsa(".reveal-on-scroll");
  function check(): void {
    const windowHeight = window.innerHeight;
    revealElems.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < windowHeight - 50) el.classList.add("visible");
    });
  }
  window.addEventListener("scroll", check);
  window.addEventListener("resize", check);
  check();
}

// Fetch posts and display them
async function fetchAndShowPosts(): Promise<void> {
  try {
    const res = await fetch(postsEndpoint);
    if (!res.ok) throw new Error("Network response was not ok");
    const posts: Post[] = await res.json() as Post[];
    const container = qs("#posts") as HTMLElement | null;
    if (!container) return;
    posts.forEach((p: Post) => {
      const article = document.createElement("article");
      article.classList.add("post");
      article.innerHTML = `<h3>${p.title}</h3><p>${p.body}</p><button class='open-post' data-postid='${p.id}'>Details</button>`;
      container.appendChild(article);
    });

    // add listeners for details buttons
    qsa(".open-post").forEach(btn => {
      btn.addEventListener("click", (e: Event) => {
        const idStr = (e.currentTarget as HTMLElement).getAttribute("data-postid");
        if (!idStr) return;
        const postId = Number(idStr);
        showPostDetails(postId);
      });
    });
  } catch (err) {
    console.error("Fetch failed", err);
  }
}

function showPostDetails(postId: number): void {
  // find the post data element and show modal with details
  const modal = qs("#postModal") as HTMLElement | null;
  if (!modal) return;
  // naive approach: fetch single post
  fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    .then(r => r.json())
    .then((p: Post) => {
      const body = modal.querySelector(".modal-body") as HTMLElement | null;
      if (body) body.innerHTML = `<h2>${p.title}</h2><p>${p.body}</p>`;
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
