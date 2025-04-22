document.addEventListener("DOMContentLoaded", async () => {
  const profileImg = document.querySelector(".center-img");

  if (urlParams.has("profileUrl")) {
    profileImg.src = urlParams.get("profileUrl");
  } else {
    try {
      const response = await fetch(
        "https://api.yunexiz.is-a.dev/v0beta/discord/user/"
      );
      const data = await response.json();
      const profileUrl = data?.avatar_url;

      profileImg.src = profileHash
        ? profileUrl
        : "/assets/images/pfp.webp";
      urlParams.set("profileUrl", profileImg.src);
    } catch (error) {
      console.error(error);
      profileImg.src = "/assets/images/pfp.webp";
    }
  }

  profileImg.style.display = "block";
  profileImg.style.animation = "zoomInPlace 0.5s ease-out forwards";
});
