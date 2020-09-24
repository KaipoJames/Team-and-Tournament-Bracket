import { playerFactory as PlayerFactory } from "../main_objects/player.js";
import { teamFactory as TeamFactory } from "../main_objects/team.js";
import { functions as Functions } from "../functions.js";

const registerPlayerBtn = document.querySelector(".register-player-btn");
const registerTeamBtn = document.querySelector(".register-team-btn");
//const playerFormInputs = document.querySelectorAll("#player-form input");
//const teamFormInputs = document.querySelectorAll("#team-form input");

const playerSubmitBtn = document.querySelector("#player-submit-btn");
const teamSubmitBtn = document.querySelector("#team-submit-btn");

const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const playerRating = document.getElementById("player-rating");

const teamName = document.getElementById("team-name");
const teamCity = document.getElementById("team-city");
const teamRating = document.getElementById("team-rating");

const stringNote = document.querySelector(".string-note");

var currentURL = window.location.href;

var database = firebase.database();

export const firebaseObj = {
  init() {
    console.log("initialized reference to firebase.database()");
  },
};

const formApp = {
  init() {
    this.showActivePage();
    this.addEventListeners();
  },

  sendPlayerData() {
    console.log(firstName.value);
    console.log(lastName.value);
    console.log(playerRating.value);
    //prettier-ignore
    const player = PlayerFactory.createPlayer(firstName.value, lastName.value, parseInt(playerRating.value));
    console.log(player);
    this.writePlayerToDatabase(player);
  },

  sendTeamData() {
    console.log(teamName.value);
    console.log(teamCity.value);
    console.log(teamRating.value);
    //prettier-ignore
    const team = TeamFactory.createTeam2(teamName.value, teamCity.value, parseInt(teamRating.value));
    this.writeTeamToDatabase(team);
  },

  addEventListeners() {
    if (playerSubmitBtn) {
      playerSubmitBtn.addEventListener("click", () => {
        console.log("clicked submit");
        this.sendPlayerData();
      });
    }
    if (teamSubmitBtn) {
      teamSubmitBtn.addEventListener("click", () => {
        console.log("clicked submit");
        this.sendTeamData();
      });
    }
  },

  writePlayerToDatabase(player) {
    const uniqueID = Functions.generatePlayerID();
    player.playerID = uniqueID;
    //prettier-ignore
    database.ref("Players/" + player.firstName + " " + player.lastName).set({
        firstName: player.firstName,
        lastName: player.lastName,
        playerID: player.playerID,
        rating: player.rating,
        strength: player.strength,
        speed: player.speed,
        agility: player.agility,
        endurance: player.endurance,
        currentTeam: player.currentTeam,
      });
    //console.log(player.firstName + " " + player.lastName + " is now registered!");
    stringNote.innerHTML =
      player.firstName + " " + player.lastName + " is now registered!";
  },

  writeTeamToDatabase(team) {
    const uniqueID = Functions.generateTeamID();
    team.teamID = uniqueID;
    //prettier-ignore
    database.ref("Teams/" + team.name).set({
        teamName: team.name,
        teamCity: team.city,
        teamID: team.teamID,
        rating: team.rating,
        strength: team.strength,
        speed: team.speed,
        agility: team.agility,
        endurance: team.endurance,
        players: team.players,

      });
    //console.log(team.name + " is now registered!");
    stringNote.innerHTML = team.name + " is now registered!";
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
