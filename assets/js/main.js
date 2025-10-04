const urlParams = new URLSearchParams(window.location.search);

import { checkNavPlacement } from "./nav.js";
import { setProfileImage } from "./profile.js";
import { animate } from "./meatballs.js";

checkNavPlacement();
animate();

// Start entry animations after loading profile
setProfileImage(urlParams).then(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.target.tagName === "UL" || entry.target.tagName === "OL") {
          entry.target.classList.remove("entry-animation");
          const listItems = entry.target.querySelectorAll("li");
          listItems.forEach((item, index) => {
            setTimeout(() => {
              item.classList.remove("entry-animation");
              item.classList.add("visible");
            }, 300 * index);
          });
        } else {
          entry.target.classList.remove("entry-animation");
          entry.target.classList.add("visible");
        }
      }
    });
  });
  document
    .querySelectorAll(".entry-animation")
    .forEach((el) => observer.observe(el));
});
