const startingContainer = document.querySelector(".starting-container");
//prettier-ignore
const quarterFinalsContainer = document.querySelector(".quarter-finals-container");
const semiFinalsContainer = document.querySelector(".semi-finals-container");
const finalsContainer = document.querySelector(".finals-container");

const bracket = {
  createSingleBracket() {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    const teamName = document.createElement("h2");
    const teamRating = document.createElement("p");
    const teamLogo = document.createElement("img");
    teamName.classList.add("team-name");
    teamRating.classList.add("team-rating");
    teamLogo.classList.add("team-logo");

    cell.appendChild(teamRating, teamName, teamLogo);
  },
};
