import { playerFactory as PlayerFactory } from "../main_objects/player.js";
import { teamFactory as TeamFactory } from "../main_objects/team.js";
import { functions as Functions } from "../functions.js";

const registerPlayerBtn = document.querySelector(".register-player-btn");
const registerTeamBtn = document.querySelector(".register-team-btn");
const playerSubmitBtn = document.querySelector("#player-submit-btn");
const teamSubmitBtn = document.querySelector("#team-submit-btn");

//Get Player Input Data
const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const playerRating = document.getElementById("player-rating");

//Get Team Input Data
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

export const formApp = {
  init() {
    this.showActivePage();
    this.addEventListeners();
    //this.getPlayerNames();
    this.getTeamNames();
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

  returnPlayerObject() {
    //prettier-ignore
    const player = PlayerFactory.createPlayer(firstName.value, lastName.value, parseInt(playerRating.value));
    return player;
  },

  sendPlayerData() {
    console.log(firstName.value);
    console.log(lastName.value);
    console.log(playerRating.value);
    //prettier-ignore
    const player = this.returnPlayerObject();
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

  getPlayerNames() {
    database
      .ref("Players/")
      .once("value")
      .then((snapshot) => {
        let data = [];
        snapshot.forEach((snap) => {
          data.push(snap.val());
        });
        let players = [];
        console.log("Number Of Records: " + data.length);
        for (var player of data) {
          const playerObj = this.createPlayerObject(player);
          players.push(playerObj);
          //console.log(player);
        }
        for (const player of players) {
          console.log(player);
        }
      });
  },

  getTeamNames() {
    database
      .ref("Teams/")
      .once("value")
      .then((snapshot) => {
        let data = [];
        snapshot.forEach((snap) => {
          data.push(snap.val());
        });
        let teams = [];
        console.log("Number Of Records: " + teams.length);
        for (var team of data) {
          const teamObj = this.createTeamObject(team);
          teams.push(teamObj);
          //console.log(team);
        }
        for (const team of teams) {
          console.log(team);
        }
      });
  },
  createPlayerObject(player) {
    //prettier-ignore
    const newPlayer = PlayerFactory.createPlayer(player.firstName, player.lastName, parseInt(player.rating))
    return newPlayer;
  },
  createTeamObject(team) {
    //prettier-ignore
    const newTeam = TeamFactory.createTeam2(team.teamName, team.teamCity, parseInt(team.rating))
    return newTeam;
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
