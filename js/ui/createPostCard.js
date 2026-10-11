import { PROFILE_IMAGE } from "../data/posts.js";

export function createPostCard(post) {
  const card = document.createElement("article");
  card.className = "overflow-hidden relative group rounded-lg h-64";

  const authorImage = document.createElement("img");
  authorImage.className = "absolute top-1 left-1 z-20 w-10 h-10 rounded-full";
  authorImage.title = post.author;
  authorImage.src = PROFILE_IMAGE;
  authorImage.alt = `${post.author}'s profile picture`;

  const image = document.createElement("img");
  image.src = post.image;
  image.alt = post.description || post.title;
  image.className = "rounded-lg shadow-md object-cover group-hover:scale-125 transition-all duration-300 w-full h-52 group-hover:h-full";

  const overlay = document.createElement("div");
  overlay.className = "bg-black bg-opacity-30 w-full h-full z-10 absolute top-0 left-0 justify-center items-center hidden group-hover:flex";
  const overlayTitle = document.createElement("h2");
  overlayTitle.className = "text-white font-semibold";
  overlayTitle.textContent = post.title;
  overlay.append(overlayTitle);

  const title = document.createElement("h2");
  title.className = "text-black font-semibold";
  title.textContent = post.title;
  card.append(authorImage, image, overlay, title);
  return card;
}
