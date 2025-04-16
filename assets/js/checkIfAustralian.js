const urlParams = new URLSearchParams(window.location.search);

document.addEventListener("DOMContentLoaded", async () => {
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
});
