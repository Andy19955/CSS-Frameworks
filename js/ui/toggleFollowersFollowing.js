export function toggleFollowersFollowing() {
  const views = {
    followers: {
      select: document.querySelector("#followers-select"),
      view: document.querySelector("#followers"),
    },
    following: {
      select: document.querySelector("#following-select"),
      view: document.querySelector("#following"),
    },
  };

  function switchView(activeType, inactiveType) {
    views[activeType].select.classList.add("underline");
    views[inactiveType].select.classList.remove("underline");

    views[activeType].view.classList.remove("hidden");
    views[activeType].view.classList.add("flex");
    views[inactiveType].view.classList.add("hidden");
    views[inactiveType].view.classList.remove("flex");
  }

  views.followers.select.addEventListener("click", () => switchView("followers", "following"));
  views.following.select.addEventListener("click", () => switchView("following", "followers"));
}
