import {
    fetchPosts, getFilteredPosts, setSearchQuery,
    addPosts, setPage, getPage,
    setLoading, isLoading, setHasMore, hasMorePosts
} from './model.js';
import {
    renderPosts, showLoading, hideLoading,
    showNoMore, showError, clearError, elements
} from './view.js';

const DEBOUNCE_DELAY = 300;
const SCROLL_THRESHOLD = 200;
let debounceTimer = null;

async function loadMorePosts() {
    if (isLoading() || !hasMorePosts()) return;

    setLoading(true);
    showLoading();
    clearError();

    try {
        const newPosts = await fetchPosts(getPage());
        addPosts(newPosts);
        setPage(getPage() + 1);

        if (newPosts.length === 0) {
            setHasMore(false);
            showNoMore();
        }

        renderPosts(getFilteredPosts());
    } catch (error) {
        showError(error.message);
    } finally {
        setLoading(false);
        hideLoading();
    }
}

function handleScroll() {
    const scrollPosition = window.innerHeight + window.scrollY;
    const documentHeight = document.documentElement.scrollHeight;

    if (documentHeight - scrollPosition <= SCROLL_THRESHOLD) {
        loadMorePosts();
    }
}

function debounceSearch() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        const query = elements.searchInput.value;
        setSearchQuery(query);
        renderPosts(getFilteredPosts());
    }, DEBOUNCE_DELAY);
}

function init() {
    loadMorePosts();
    window.addEventListener('scroll', handleScroll);
    elements.searchInput.addEventListener('input', debounceSearch);
}

init();