const urlParams = new URLSearchParams(window.location.search);
const sections = document.querySelectorAll("section");

// Entry animation
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.remove("entry-animation");
      entry.target.classList.add("visible");
    }
  });
});
document
  .querySelectorAll(".entry-animation")
  .forEach((el) => observer.observe(el));

// Navigation
const nav = document.querySelector("nav");
let checkingNavPlacement = false;
const handleNav = (id) => {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
};

for (let i = 0; i < nav.children.length; i++) {
  if (nav.children[i].tagName === "BUTTON") {
    nav.children[i].onclick = () => {
      handleNav(nav.children[i].dataset.target);
    };
    nav.children[i].style.animation = "slideUp 0.5s ease-out forwards";
    nav.children[i].style.animationDelay = 1000 + 100 * i + "ms";
  }
}

async function setNavColors(preset) {
  return new Promise((resolve) => {
    nav.style.backgroundColor = `var(--${preset}-nav-background-color)`;
    nav.style.border = `var(--${preset}-border)`;

    for (let i = 0; i < nav.children.length; i++) {
      nav.children[
        i
      ].style.backgroundColor = `var(--${preset}-background-color)`;
      nav.children[i].style.border = `var(--${preset}-border)`;
      switch (preset) {
        case "primary":
          nav.children[i].children[0].setAttribute("fill", "#e0e0e0");
          break;
        case "secondary":
          nav.children[i].children[0].setAttribute("fill", "#000000");
          break;
      }
    }

    resolve();
  });
}

async function checkNavPlacement() {
  return new Promise(async (resolve) => {
    checkingNavPlacement = true;

    const rect = nav.getBoundingClientRect();
    const elements = document.elementsFromPoint(
      rect.x + rect.width / 2,
      rect.y + rect.height / 2
    );

    const farthestBehind = elements[elements.length - 3];
    if (farthestBehind.tagName === "SECTION") {
      for (let i = 0; i < sections.length; i++) {
        if (
          farthestBehind.id === sections[i].id &&
          sections[i].dataset.theme === "dark"
        ) {
          await setNavColors("primary");
          break;
        } else if (
          farthestBehind.id === sections[i].id &&
          sections[i].dataset.theme === "light"
        ) {
          await setNavColors("secondary");
          break;
        }
      }
    }
    checkingNavPlacement = false;
    resolve();
  });
}

checkNavPlacement();
document.addEventListener("scroll", async () => {
  if (!checkingNavPlacement) await checkNavPlacement();
});

// Anti-Australian checks
(async () => {
  try {
    const jsonResponse = await fetch("/assets/data/anti-australians.json");
    const jsonData = await jsonResponse.json();

    const allNames = jsonData.all;

    let isUpsideDown = allNames.some(
      (name) => urlParams.has(name) && urlParams.get(name) === "true"
    );

    if (isUpsideDown) {
      document.body.style.transform = "rotate(180deg)";
      document.getElementById("username").innerHTML =
        "Yunexiz - ¡uʍop ǝpᴉsdn sᴉ ɐᴉlɐɹʇsn∀";
    }

    if (!isUpsideDown) {
      const response = await fetch("https://ipapi.co/json/");
      const data = await response.json();

      if (data.country === "AU") {
        document.body.style.transform = "rotate(180deg)";
        document.getElementById("username").innerHTML =
          "Yunexiz - ¡uʍop ǝpᴉsdn sᴉ ɐᴉlɐɹʇsn∀";

        urlParams.set(jsonData.main, "true");
        window.history.replaceState(
          {},
          "",
          `${window.location.pathname}?${urlParams}`
        );
      }
    }
  } catch (error) {
    console.error("Australian check error:", error);
  }
})();
