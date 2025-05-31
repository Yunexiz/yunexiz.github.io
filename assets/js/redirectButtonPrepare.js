document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("/assets/data/website-list.json");
    const data = await response.json();

    const ul = document.getElementById("website-list");
    Object.entries(data).forEach(([name, details]) => {
      const li = document.createElement("li");

      const button = document.createElement("button");
      button.textContent = name;
      button.classList.add("redirect-button");
      button.dataset.url = details.url;

      button.addEventListener("click", () => {
        window.location.href = button.dataset.url;
      });

      li.appendChild(button);
      li.append(` - ${details.description}`);
      ul.appendChild(li);
    });
  } catch (error) {
    console.error("Error loading websites:", error);
  }
});
