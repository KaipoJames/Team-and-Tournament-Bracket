import { formApp as FormApp } from "../forms/form.js";

const selectContainer = document.querySelector(".teams-select-container");

const startScreenObj = {
  init() {
    this.addSelectBlock(1);
  },

  createElement(element, content) {
    const newElement = document.createElement(element);
    newElement.innerHTML = content;
    return newElement;
  },

  addSelectBlock(n) {
    const playerRating = FormApp.getPlayerData();
    const teamOneContainer = document.createElement("div");
    teamOneContainer.classList.add("team-container");
    teamOneContainer.classList.add("team-" + n + "-container");
    selectContainer.appendChild(teamOneContainer);

    const select = document.createElement("select");
    select.name = "team-" + n + "-select";
    select.id = "team-" + n + "-select";
    teamOneContainer.appendChild(select);

    const option = this.createElement("option", playerRating);
    option.value = "RatingPlayer";
    option.innerHTML = "PlayerRating";
    select.appendChild(option);
  },
};

startScreenObj.init();
