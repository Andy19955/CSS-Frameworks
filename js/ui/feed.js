import { handlePostSubmit } from "../handlers/handlePostSubmit.js";
import { handleSearch } from "../handlers/handleSearch.js";
import { readPosts } from "../storage/readPosts.js";
import { savePosts } from "../storage/savePosts.js";
import { renderPosts } from "./renderPosts.js";

export function initFeed() {
  const form = document.querySelector("#post-form");
  const imageInput = document.querySelector("#image");
  const searchInput = document.querySelector("#search");
  const postsContainer = document.querySelector("#posts");
  const emptyPosts = document.querySelector("#empty-posts");
  const message = document.querySelector("#post-form-message");
  let posts = readPosts();

  const renderFeed = () => {
    renderPosts({
      posts,
      searchTerm: searchInput.value.trim().toLowerCase(),
      searchLabel: searchInput.value,
      postsContainer,
      emptyPosts,
    });
  };

  handlePostSubmit({
    form,
    imageInput,
    message,
    getPosts: () => posts,
    setPosts: (updatedPosts) => {
      savePosts(updatedPosts);
      posts = updatedPosts;
    },
    renderPosts: renderFeed,
  });
  handleSearch({ searchInput, renderPosts: renderFeed });
  renderFeed();
}
