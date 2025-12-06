const apiUrl = "https://api.github.com/users/yunexiz/repos";
const projects = document.getElementById("projects");

async function getRepos() {
  return new Promise(async (resolve, reject) => {
    await fetch(apiUrl)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch");
        return resolve(response.json());
      })
      .catch((error) => {
        console.error("Failed to fetch Github repositories.", error);
        return reject(null);
      });
  });
}

async function addLinks(repo) {
  const links = document.createElement("div");
  const repoLink = document.createElement("a");

  if (repo.html_url) {
    repoLink.href = repo.html_url;
    repoLink.target = "_blank";
    repoLink.innerHTML =
      "<img src='/assets/images/github-mark-white.svg' alt='Github'>";

    links.appendChild(repoLink);
  }

  if (repo.homepage) {
    const homepageLink = document.createElement("a");

    homepageLink.href = repo.homepage;
    homepageLink.target = "_blank";
    homepageLink.innerHTML = "<img src='/assets/images/visit.svg' alt='Visit'>";

    links.appendChild(homepageLink);
  }
  return links;
}

export async function displayProjects() {
  const fetchedRepos = await getRepos();
  const definedProjects = await fetch("/assets/data/projects.json").then(
    (response) => response.json()
  );

  const repos = [...fetchedRepos, ...definedProjects].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return new Promise(async (resolve, reject) => {
    if (!repos) {
      const errorMessage = document.createElement("h1");
      errorMessage.textContent = "Failed to fetch repositories.";
      return reject(errorMessage.textContent);
    }

    const repoList = document.createElement("ul");
    repoList.id = "repo-list";
    repoList.classList.add("entry-animation");

    for (let i = 0; i < repos.length; i++) {
      if (repos[i].fork === true) continue;

      const li = document.createElement("li");
      const title = document.createElement("h2");
      const desc = document.createElement("p");
      const hr = document.createElement("hr");
      const links = await addLinks(repos[i]);

      title.textContent = repos[i].name;
      desc.textContent = repos[i].description;

      li.appendChild(title);
      li.appendChild(desc);
      li.appendChild(hr);
      li.appendChild(links);

      repoList.appendChild(li);
    }

    projects.appendChild(repoList);
    resolve();
  });
}
