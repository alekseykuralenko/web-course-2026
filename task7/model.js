const API_URL = 'https://jsonplaceholder.typicode.com/posts';
const POSTS_PER_PAGE = 10;

const state = {
    posts: [],
    page: 1,
    loading: false,
    hasMore: true,
    searchQuery: ''
};

export async function fetchPosts(page) {
    try {
        const response = await fetch(`${API_URL}?_page=${page}&_limit=${POSTS_PER_PAGE}`);
        if (!response.ok) {
            throw new Error(`Ошибка сервера: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`Не удалось загрузить посты: ${error.message}`);
    }
}

export function getPosts() {
    return state.posts;
}

export function getSearchQuery() {
    return state.searchQuery;
}

export function setSearchQuery(query) {
    state.searchQuery = query.toLowerCase().trim();
}

export function getFilteredPosts() {
    const query = state.searchQuery;
    if (!query) return state.posts;
    return state.posts.filter(post =>
        post.title.toLowerCase().includes(query)
    );
}

export function addPosts(newPosts) {
    state.posts.push(...newPosts);
}

export function setPage(page) {
    state.page = page;
}

export function getPage() {
    return state.page;
}

export function setLoading(loading) {
    state.loading = loading;
}

export function isLoading() {
    return state.loading;
}

export function setHasMore(hasMore) {
    state.hasMore = hasMore;
}

export function hasMorePosts() {
    return state.hasMore;
}