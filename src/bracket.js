import { main as Main } from "./main.js";

const startingContainer = document.querySelector(".starting-container");
//prettier-ignore
const quarterFinalsContainer = document.querySelector(".quarter-finals-container");
const semiFinalsContainer = document.querySelector(".semi-finals-container");
const finalsContainer = document.querySelector(".finals-container");

export let cells = [];
let cellsCopy;
let quarterCells = [];
let semiCells = [];

// This Object handles Drawing the Canvas of the bracket. Permanent Objects.
export const Bracket_Canvas = {
  init() {
    this.addBracketsToContainers();
    this.addVerticalLines();
  },

  createSingleBracket(container) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    const teamName = document.createElement("h2");
    const teamRating = document.createElement("p");
    const teamLogo = document.createElement("img");
    const teamScore = document.createElement("div");
    teamName.classList.add("team-name");
    teamRating.classList.add("team-rating");
    teamLogo.classList.add("team-logo");
    teamScore.classList.add("team-score");
    cell.appendChild(teamRating);
    cell.appendChild(teamName);
    cell.appendChild(teamLogo);
    cell.appendChild(teamScore);

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

  addVerticalLines() {
    let c = 1;
    for (const cell of cells) {
      if (cell.classList.contains("quarter-finals-container-child")) {
        const verticalLine = document.createElement("div");
        verticalLine.classList.add("vertical-line");
        verticalLine.classList.add("vertical-line-quarter");
        verticalLine.classList.add("vertical-line-quarter-" + c);
        c++;
        cell.appendChild(verticalLine);
      } else if (cell.classList.contains("semi-finals-container-child")) {
        const verticalLine = document.createElement("div");
        verticalLine.classList.add("vertical-line");
        verticalLine.classList.add("vertical-line-semi");
        verticalLine.classList.add("vertical-line-semi-" + c);
        c++;
        cell.appendChild(verticalLine);
      } else if (cell.classList.contains("finals-container-child")) {
        const verticalLine = document.createElement("div");
        verticalLine.classList.add("vertical-line");
        verticalLine.classList.add("vertical-line-finals");
        cell.appendChild(verticalLine);
      }
    }
  },
};

// Bracket Object To Handle Temporary Changes To Bracket
export const Bracket_Content = {
  init() {
    cellsCopy = cells.splice();
    //console.log("cellsCopy: " + cellsCopy);
    this.initializeTeams();

    //this.advanceToSemis("testRun");
  },

  initializeTeams() {
    const contenders = this.getContentfromMain();
    //cellsCopy = cells.splice();
    cells.splice(8);
    //console.log(cells.length);
    let i = 0;
    for (let j = 0; j < 8; j++) {
      this.iterate(i, contenders);
      i++;
    }
  },

  addContentToBracket(cell, name, rating, logo) {
    //console.log(cell.children);
    const capitalized = name.charAt(0).toUpperCase() + name.slice(1);
    for (let i = 0; i < cell.children.length; i++) {
      if (cell.children[i].className == "team-name") {
        cell.children[i].innerHTML = capitalized;
      } else if (cell.children[i].className == "team-rating") {
        cell.children[i].innerHTML = rating;
      } else if (cell.children[i].className == "team-logo") {
        cell.children[i].src = logo;
      }
    }
  },

  advanceToSemis(winners) {
    const quarter_cell_1 = quarterFinalsContainer.children[0];
    const quarter_cell_2 = quarterFinalsContainer.children[1];
    const quarter_cell_3 = quarterFinalsContainer.children[2];
    const quarter_cell_4 = quarterFinalsContainer.children[3];
    //prettier-ignore
    quarterCells.push(quarter_cell_1,quarter_cell_2,quarter_cell_3,quarter_cell_4);
    for (let i = 0; i < quarterCells.length; i++) {
      winners[i].currentCell = quarterCells[i];
      //console.log(quarterCells[i]);
      //prettier-ignore
      this.addContentToBracket(quarterCells[i], winners[i].name, winners[i].rating, winners[i].src);
    }
  },

  advanceToFinals(winners) {
    const semi_cell_1 = semiFinalsContainer.children[0];
    const semi_cell_2 = semiFinalsContainer.children[1];
    //prettier-ignore
    semiCells.push(semi_cell_1,semi_cell_2);
    for (let i = 0; i < semiCells.length; i++) {
      winners[i].currentCell = semiCells[i];
      //console.log(semiCells[i]);
      //prettier-ignore
      this.addContentToBracket(semiCells[i], winners[i].name, winners[i].rating, winners[i].src);
    }
  },

  displayChampion(winner) {
    const final_cell_1 = finalsContainer.children[0];
    winner.currentCell = final_cell_1;
    final_cell_1.classList.add("winner");
    //prettier-ignore
    this.addContentToBracket(final_cell_1, winner.name, winner.rating, winner.src);
  },

  getContentfromMain() {
    let contenders = Main.getContenders();
    //remove duplicates
    contenders = contenders.splice(8);
    for (let i = 0; i < contenders.length; i++) {
      contenders[i].currentCell = cells[i];
    }
    return contenders;
  },

  iterate(i, array) {
    //array[i].currentCell = cells[i];
    //console.log("objectInfo: " + array[i].currentCell.children);
    this.addContentToBracket(
      cells[i],
      array[i].name,
      array[i].rating,
      array[i].src
    );
  },

  postGameAddClasses(winner, loser) {
    let winnerCell = winner.currentCell;
    let loserCell = loser.currentCell;
    //console.log("winnerCell: " + winnerCell.children);
    //console.log("loserCell: " + loserCell.children);
    winnerCell.children[1].classList.add("winner");
    loserCell.children[1].classList.add("defeated");
  },

  getScoreDiv(cell) {
    let scoreDiv = cell.children[3];
    console.log(scoreDiv);
    return scoreDiv;
  },
};
