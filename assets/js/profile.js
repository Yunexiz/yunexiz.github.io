export async function setProfileImage(urlParams) {
  return new Promise(async (resolve) => {
    const profileImg = document.getElementById("profile");
    if (urlParams.has("profileUrl")) {
      profileImg.src = urlParams.get("profileUrl");
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
          : "/assets/images/pfp.webp";
        urlParams.set("profileUrl", profileImg.src);
        resolve();
      } catch (error) {
        console.error(error);
        profileImg.src = "/assets/images/pfp.webp";
        resolve("Failed to fetch.");
      }
    }
  });
}
