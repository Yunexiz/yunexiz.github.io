const profileImg = document.querySelector(".center-img");

if (urlParams.has("profileUrl")) {
  profileImg.src = urlParams.get("profileUrl");
} else {
  try {
    const response = await fetch(
      "https://api.lanyard.rest/v1/users/1040303561847881729"
    );
    const data = await response.json();
    const profileHash = data?.data?.discord_user?.avatar;

    profileImg.src = profileHash
      ? `https://cdn.discordapp.com/avatars/1040303561847881729/${profileHash}.webp`
      : "/assets/images/pfp.webp";
    urlParams.set("profileUrl", profileImg.src);
  } catch (error) {
    console.error(error);
    profileImg.src = "/assets/images/pfp.webp";
  }
}

profileImg.style.display = "block";
profileImg.style.animation = "zoomInPlace 0.5s ease-out forwards";
