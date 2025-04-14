if (!urlParams.has("animate") || urlParams.get("animate") === "true") {
  const animations = [
    "flyInPlace",
    "flipInWobble",
    "zoomInPlace",
    "slideInWobble",
  ];
  const infoBox = document.querySelector(".info-box");

  let animation;

  if (urlParams.has("animation")) {
    animation = urlParams.get("animation");
  } else {
    animation = animations[Math.floor(Math.random() * animations.length)];
  }

  infoBox.style.animation = `${animation} 1.5s ease-in-out forwards`;
  urlParams.set("animate", "false");
}
