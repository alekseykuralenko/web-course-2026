const postsContainer = document.getElementById('posts-container');
const loadingEl = document.getElementById('loading');
const noMoreEl = document.getElementById('no-more');
const errorEl = document.getElementById('error-message');
const searchInput = document.getElementById('search-input');

// Создание карточки одного поста
function createPostCard(post) {
    const card = document.createElement('article');
    card.className = 'post-card';

    const title = document.createElement('h2');
    title.className = 'post-title';
    title.textContent = post.title;

    const body = document.createElement('p');
    body.className = 'post-body';
    body.textContent = post.body;

    const author = document.createElement('p');
    author.className = 'post-author';
    author.innerHTML = `Автор: <span>#${post.userId}</span>`;

    card.appendChild(title);
    card.appendChild(body);
    card.appendChild(author);

    return card;
}

// Полная перерисовка списка постов
export function renderPosts(posts) {
    postsContainer.innerHTML = '';
    posts.forEach(post => {
        postsContainer.appendChild(createPostCard(post));
    });
}

export function showLoading() {
    loadingEl.classList.remove('hidden');
}

export function hideLoading() {
    loadingEl.classList.add('hidden');
}

export function showNoMore() {
    noMoreEl.classList.remove('hidden');
}

export function showError(message) {
    errorEl.textContent = message;
    errorEl.classList.remove('hidden');
}

export function clearError() {
    errorEl.classList.add('hidden');
    errorEl.textContent = '';
}

export const elements = {
    searchInput
};