const apiUrl = "https://api.github.com/users/yunexiz/repos";
const projects = document.getElementById("projects");

async function getRepos() {
  return await fetch(apiUrl)
    .then((response) => {
      if (!response.ok) throw new Error("Failed to fetch");
      return response.json();
    })
    .then((json) => {
      return json;
    })
    .catch((error) => {
      console.error("Failed to fetch Github repositories.", error);
      return null;
    });
}

export async function displayRepos() {
  const repos = await getRepos();

  if (!repos) {
    const errorMessage = document.createElement("h1");
    errorMessage.textContent = "Failed to fetch repositories.";
    return;
  }

  const repoList = document.createElement("ul");
  repoList.id = "repo-list";
  repoList.classList.add("entry-animation");

  for (let i = 0; i < repos.length; i++) {
    if (repos[i].fork === true) continue;

    const li = document.createElement("li");
    const title = document.createElement("h2");
    const desc = document.createElement("p");
    const link = document.createElement("footer");

    title.textContent = repos[i].name;
    desc.textContent = repos[i].description;
    link.innerHTML = `<a href="${repos[i].html_url}"><img src="/assets/images/github.svg" alt="Github Link"></img></a>`;

    li.appendChild(title);
    li.appendChild(desc);
    li.appendChild(link);

    repoList.appendChild(li);
  }

  projects.appendChild(repoList);
}
