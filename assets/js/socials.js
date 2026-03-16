const socials = document.getElementById("social-icons");

async function getSocials() {
  const response = await fetch("/assets/data/socials.json");
  const json = await response.json();
  json.sort((a, b) => a.name.localeCompare(b.name));

  const socialElements = [];

  for (const social of json) {
    const li = document.createElement("li");
    li.id = social.name;

    const anchor = document.createElement("a");
    anchor.id = social.name;
    anchor.target = "_blank";
    anchor.href = social.url;

    const img = document.createElement("img");
    img.src = social.icon;
    img.alt = social.display;

    anchor.appendChild(img);
    li.appendChild(anchor);

    socialElements.push(li);
  }

  return socialElements;
}

export async function displaySocials() {
  const socialElements = await getSocials();

  socials.append(...socialElements);
}
