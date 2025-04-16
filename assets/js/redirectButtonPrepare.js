const buttons = document.querySelectorAll(".redirect-button");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const buttonId = button.id;
    if (buttonId) {
      const url = `https://${buttonId}.is-a.dev`;
      window.location.href = url;
    } else {
      console.warn("Button is missing an ID:", button);
    }
  });
});
