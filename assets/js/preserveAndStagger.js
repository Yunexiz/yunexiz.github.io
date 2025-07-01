document.querySelectorAll(".preserve-params").forEach((link) => {
  link.addEventListener("click", function (event) {
    event.preventDefault();
    let destination = this.getAttribute("href");
    window.location.href = destination + "?" + urlParams;
  });
});

const socialIcons = document.querySelector(".social-icons").children;
const iconCount = socialIcons.length;
const delay =
  !urlParams.has("animate") || urlParams.get("animate") === "true" ? 0 : 1000;

for (let i = 0; i < iconCount; i++) {
  setTimeout(function () {
    const imageElement = socialIcons[i].querySelector("img");
    if (imageElement) {
      imageElement.style.animation = "zoomInPlace 0.5s ease-out";
    }
  }, 500 + delay + i * 100);
}
