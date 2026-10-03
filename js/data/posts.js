export const STORAGE_KEY = "beam-posts";
export const CURRENT_USER = "Brody Clayton";
export const PROFILE_IMAGE = "../images/profile-image.jpg";

const demoPosts = [
  ["Travel to the dunes", "Blurry photo of sand", "../images/post1.jpg"],
  ["A mindfull place", "A tree with a mountain in the background", "../images/post2.jpg"],
  ["Visiting a new town", "A little town at the foot of mountains", "../images/post3.jpg"],
  ["Waterstreams", "Person standing at the side of a river", "../images/post4.jpg"],
  ["Dinner for seven", "Decorated tables in dining hall", "../images/post5.jpg"],
  ["An escape to the wild", "Water in front of mountains", "../images/post6.jpg"],
];

export const initialPosts = demoPosts.map(([title, description, image], index) => ({
  id: `demo-${index + 1}`,
  title,
  description,
  image,
  author: CURRENT_USER,
}));
