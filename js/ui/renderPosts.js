import { createPostCard } from "./createPostCard.js";

export function renderPosts({ posts, searchTerm, searchLabel, postsContainer, emptyPosts }) {
  const visiblePosts = posts.filter(({ title, description }) => `${title} ${description}`.toLowerCase().includes(searchTerm));
  postsContainer.replaceChildren(...visiblePosts.map(createPostCard));
  emptyPosts.textContent = searchTerm ? `No posts match "${searchLabel}".` : "No posts yet. Create the first one!";
  emptyPosts.classList.toggle("hidden", visiblePosts.length > 0);
}
