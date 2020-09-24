const registerPlayerBtn = document.querySelector(".register-player-btn");
const registerTeamBtn = document.querySelector(".register-team-btn");

var currentURL = window.location.href;

const formApp = {
  init() {
    this.showActivePage();
  },
  showActivePage() {
    console.log(currentURL);
    if (currentURL.includes("team")) {
      console.log("current url contains team!");
      registerTeamBtn.classList.add("selected-page");
      if (registerPlayerBtn.classList.contains("selected-page")) {
        registerPlayerBtn.classList.remove("selected-page");
      }
    }
    if (currentURL.includes("player")) {
      console.log("current url contains player!");
      registerPlayerBtn.classList.add("selected-page");
      if (registerTeamBtn.classList.contains("selected-page")) {
        registerTeamBtn.classList.remove("selected-page");
      }
    }
  },
};

formApp.init();
