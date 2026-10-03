import { toggleMenu } from "./ui/shared/toggleMenu.js";
import { toggleFollowersFollowing } from "./ui/toggleFollowersFollowing.js";

function router() {
  const { pathname } = location;

  switch (pathname) {
    case "/profile/":
      toggleFollowersFollowing();
      break;
  }
}

router();
toggleMenu();
