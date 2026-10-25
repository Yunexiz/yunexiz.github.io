const profileImg = document.getElementById("avatar");

export async function setProfileImage(urlParams) {
  return new Promise(async (resolve) => {
    if (urlParams.has("avatarUrl")) {
      profileImg.src = urlParams.get("avatarUrl");
      resolve();
    } else {
      try {
        const response = await fetch(
          "https://api.yunexiz.is-a.dev/v1/discord/user/"
        );
        const data = await response.json();
        const profileUrl = data?.avatar_url;

        profileImg.src = profileUrl
          ? `${profileUrl}?size=1024`
          : "/assets/images/avatar.webp";
        urlParams.set("avatarUrl", profileImg.src);
        resolve();
      } catch (error) {
        console.error(error);
        profileImg.src = "/assets/images/avatar.webp";
        resolve("Failed to fetch.");
      }
    }
  });
}
