import { qs, qsa } from '../dom/index.js';
import { openModal } from '../modal/index.js';
const postsEndpoint = 'https://jsonplaceholder.typicode.com/posts?_limit=5';
export async function fetchAndShowPosts() {
    try {
        const res = await fetch(postsEndpoint);
        if (!res.ok)
            throw new Error('Network response was not ok');
        const posts = await res.json();
        const container = qs('#posts');
        if (!container)
            return;
        posts.forEach((p) => {
            const article = document.createElement('article');
            article.classList.add('post');
            article.innerHTML = `<h3>${p.title}</h3><p>${p.body}</p><button class='open-post' data-postid='${p.id}'>Details</button>`;
            container.appendChild(article);
        });
        qsa('.open-post').forEach((btn) => {
            btn.addEventListener('click', (e) => {
                const idStr = e.currentTarget.getAttribute('data-postid');
                if (!idStr)
                    return;
                const postId = Number(idStr);
                showPostDetails(postId);
            });
        });
    }
    catch (err) {
        console.error('Fetch failed', err);
    }
}
export function showPostDetails(postId) {
    const modal = qs('#postModal');
    if (!modal)
        return;
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        .then(r => r.json())
        .then((p) => {
        const body = modal.querySelector('.modal-body');
        if (body)
            body.innerHTML = `<h2>${p.title}</h2><p>${p.body}</p>`;
        openModal(modal);
    });
}
