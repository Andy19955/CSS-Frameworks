import { initialPosts, STORAGE_KEY } from "../data/posts.js";

export function readPosts() {
  try {
    const savedPosts = localStorage.getItem(STORAGE_KEY);
    const posts = savedPosts ? JSON.parse(savedPosts) : initialPosts;
    return Array.isArray(posts) ? posts : initialPosts;
  } catch (error) {
    console.error("Unable to read saved Beam posts.", error);
    return initialPosts;
  }
}
