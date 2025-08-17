const source = document.currentScript.dataset.source;
const socialIconsContainer = document.querySelector(".social-icons");

(async () => {
  const jsonResponse = await fetch("/assets/data/social-icons.json");
  const iconData = await jsonResponse.json();

  for (const [key, val] of Object.entries(iconData)) {
    if (source === key) continue;

    const div = document.createElement("div");
    div.title = val.alt;

    const a = document.createElement("a");
    a.href = val.href;
    if (val["preserve-params"]) {
      a.addEventListener("click", function (event) {
        event.preventDefault();
        let destination = this.getAttribute("href");
        window.location.href = destination + "?" + urlParams;
      });
    }

    const img = document.createElement("img");
    img.src = val.img;
    img.alt = key;

    a.appendChild(img);
    div.appendChild(a);

    socialIconsContainer.appendChild(div);
  }
})().then(() => {
  const socialIcons = socialIconsContainer.children;
  const iconCount = socialIcons.length;
  const delay =
    !urlParams.has("animate") || urlParams.get("animate") === "true" ? 1000 : 0;

  for (let i = 0; i < iconCount; i++) {
    setTimeout(function () {
      const imageElement = socialIcons[i].querySelector("img");
      if (imageElement) {
        imageElement.style.animation = "zoomInPlace 0.5s ease-out";
      }
    }, 500 + delay + i * 100);
  }
});
