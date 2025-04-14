document.querySelectorAll(".preserve-params").forEach((link) => {
  link.addEventListener("click", function (event) {
    event.preventDefault();
    let destination = this.getAttribute("href");
    window.location.href = destination + "?" + urlParams;
  });
});

const socialIcons = document.querySelector(".social-icons").children;
const icon_count = socialIcons.length;

for (let i = 0; i < icon_count; i++) {
  setTimeout(function () {
    const imageElement = socialIcons[i].querySelector("img");
    if (imageElement) {
      imageElement.style.animation = "zoomInPlace 0.5s ease-out";
    }
  }, 1500 + i * 100);
}
