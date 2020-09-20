import { main as Main } from "./main.js";

const startingContainer = document.querySelector(".starting-container");
//prettier-ignore
const quarterFinalsContainer = document.querySelector(".quarter-finals-container");
const semiFinalsContainer = document.querySelector(".semi-finals-container");
const finalsContainer = document.querySelector(".finals-container");

let cells = [];

export const bracket = {
  init() {
    this.addBracketsToContainers();
    this.initializeTeams();
  },

  createSingleBracket(container) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    const teamName = document.createElement("h2");
    const teamRating = document.createElement("p");
    const teamLogo = document.createElement("img");
    teamName.classList.add("team-name");
    teamRating.classList.add("team-rating");
    teamLogo.classList.add("team-logo");
    cell.appendChild(teamRating);
    cell.appendChild(teamName);
    cell.appendChild(teamLogo);

    container.appendChild(cell);

    // add a unique class to each child of each column in bracket.
    const childs = container.children;
    const containerClass = container.classList[1];
    for (var child of childs) {
      child.classList.add(containerClass + "-child");
      //console.log(child.classList);
    }
    cells.push(cell);
  },

  addContentToBracket(cell, name, rating, logo) {
    console.log(cell.children);
    for (let i = 0; i < cell.children.length; i++) {
      if (cell.children[i].className == "team-name") {
        cell.children[i].innerHTML = name;
      } else if (cell.children[i].className == "team-rating") {
        cell.children[i].innerHTML = rating;
      } else if (cell.children[i].className == "team-logo") {
        cell.children[i].src = logo;
      }
    }
  },

  addBracketsToContainers() {
    for (let i = 0; i < 8; i++) {
      this.createSingleBracket(startingContainer);
    }
    for (let i = 0; i < 4; i++) {
      this.createSingleBracket(quarterFinalsContainer);
    }
    for (let i = 0; i < 2; i++) {
      this.createSingleBracket(semiFinalsContainer);
    }
    this.createSingleBracket(finalsContainer);
  },

  getContentfromMain() {
    let contenders = Main.getContenders();
    //remove duplicates
    contenders = contenders.splice(8);
    return contenders;
  },

  iterate(i, array) {
    this.addContentToBracket(
      cells[i],
      array[i].name.charAt(0).toUpperCase() + array[i].name.slice(1),
      array[i].rating,
      array[i].src
    );
  },

  initializeTeams() {
    const contenders = this.getContentfromMain();
    cells.splice(8);
    console.log(cells.length);
    let i = 0;
    for (let j = 0; j < 8; j++) {
      this.iterate(i, contenders);
      i++;
    }

    /* for (var cell of cells) {
      for (var i = 0; i < contenders.length; i++) {
        this.addContentToBracket(
          cell,
          contenders[i].name,
          contenders[i].rating,
          contenders[i].city
        );
      }
    } */
  },
};
