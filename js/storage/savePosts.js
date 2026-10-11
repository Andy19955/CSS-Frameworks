import { STORAGE_KEY } from "../data/posts.js";

export function savePosts(posts) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  } catch (error) {
    console.error("Unable to save Beam posts.", error);
    throw new Error("Your post could not be saved in this browser.");
  }
}
