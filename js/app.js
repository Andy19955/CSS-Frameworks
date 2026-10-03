import { toggleMenu } from "./ui/shared/toggleMenu.js";
import { toggleFollowersFollowing } from "./ui/toggleFollowersFollowing.js";
import { initFeed } from "./ui/feed.js";

function router() {
  const { pathname } = location;

  switch (pathname) {
    case "/feed":
    case "/feed/":
      initFeed();
      break;
    case "/profile/":
      toggleFollowersFollowing();
      break;
  }
}

router();
toggleMenu();
