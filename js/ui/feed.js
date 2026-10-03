const STORAGE_KEY = "beam-posts";
const CURRENT_USER = "Brody Clayton";
const PROFILE_IMAGE = "../images/profile-image.jpg";

const initialPosts = [
  ["Travel to the dunes", "Blurry photo of sand", "../images/post1.jpg"],
  ["A mindfull place", "A tree with a mountain in the background", "../images/post2.jpg"],
  ["Visiting a new town", "A little town at the foot of mountains", "../images/post3.jpg"],
  ["Waterstreams", "Person standing at the side of a river", "../images/post4.jpg"],
  ["Dinner for seven", "Decorated tables in dining hall", "../images/post5.jpg"],
  ["An escape to the wild", "Water in front of mountains", "../images/post6.jpg"],
].map(([title, description, image], index) => ({
  id: `demo-${index + 1}`,
  title,
  description,
  image,
  author: CURRENT_USER,
}));

function readPosts() {
  try {
    const savedPosts = localStorage.getItem(STORAGE_KEY);
    const posts = savedPosts ? JSON.parse(savedPosts) : initialPosts;
    return Array.isArray(posts) ? posts : initialPosts;
  } catch (error) {
    console.error("Unable to read saved Beam posts.", error);
    return initialPosts;
  }
}

function savePosts(posts) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  } catch (error) {
    console.error("Unable to save Beam posts.", error);
    throw new Error("Your post could not be saved in this browser.");
  }
}

function createPostCard(post) {
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

export function initFeed() {
  const form = document.querySelector("#post-form");
  const imageInput = document.querySelector("#image");
  const searchInput = document.querySelector("#search");
  const postsContainer = document.querySelector("#posts");
  const emptyPosts = document.querySelector("#empty-posts");
  const message = document.querySelector("#post-form-message");
  let posts = readPosts();

  function renderPosts() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const visiblePosts = posts.filter(({ title, description }) => `${title} ${description}`.toLowerCase().includes(searchTerm));
    postsContainer.replaceChildren(...visiblePosts.map(createPostCard));
    emptyPosts.textContent = searchTerm ? `No posts match "${searchInput.value}".` : "No posts yet. Create the first one!";
    emptyPosts.classList.toggle("hidden", visiblePosts.length > 0);
  }

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
        posts = [post, ...posts];
        savePosts(posts);
        form.reset();
        message.textContent = "Post published.";
        message.className = "min-h-6 text-sm text-green-700";
        renderPosts();
      } catch (error) {
        posts = posts.filter(({ id }) => id !== post.id);
        message.textContent = error.message;
        message.className = "min-h-6 text-sm text-red-700";
      }
    });
    reader.readAsDataURL(file);
  });

  searchInput.addEventListener("input", renderPosts);
  renderPosts();
}
