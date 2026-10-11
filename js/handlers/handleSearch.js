export function handleSearch({ searchInput, renderPosts }) {
  searchInput.addEventListener("input", () => {
    renderPosts();
  });
}
