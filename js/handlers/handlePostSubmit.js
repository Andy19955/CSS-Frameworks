import { CURRENT_USER } from "../data/posts.js";

export function handlePostSubmit({ form, imageInput, message, getPosts, setPosts, renderPosts }) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const file = imageInput.files[0];
    if (!file || !file.type.startsWith("image/")) {
      message.textContent = "Please choose an image file.";
      message.className = "min-h-6 text-sm text-red-700";
      return;
    }

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const post = {
        id: crypto.randomUUID(),
        title: document.querySelector("#title").value.trim(),
        description: document.querySelector("#description").value.trim(),
        image: reader.result,
        author: CURRENT_USER,
      };

      try {
        setPosts([post, ...getPosts()]);
        form.reset();
        message.textContent = "Post published.";
        message.className = "min-h-6 text-sm text-green-700";
        renderPosts();
      } catch (error) {
        message.textContent = error.message;
        message.className = "min-h-6 text-sm text-red-700";
      }
    });
    reader.readAsDataURL(file);
  });
}
