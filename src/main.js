import { Team, teamFactory as TeamFactory } from "./main_objects/team.js";
import { Bracket_Canvas, Bracket_Content } from "./main_objects/bracket.js";
import { tournament as Tournament } from "./main_objects/tournament.js";
//import { functions as Functions } from "./functions.js";
import { firebaseObj as FirebaseObj } from "./forms/form.js";

const startSimulationBtn = document.querySelector(".simulate");

const teamObjects = [];
const contenders = [];

// name, city, rating, strength, speed, agility, endurance
/* const wyverns = app.createTeam2("wyverns", "manoa", 70);
const menehune = app.createTeam2("menehune", "mililani", 78);
const knights = app.createTeam2("knights", "castle", 72);
const mules = app.createTeam2("mules", "leilehua", 79);
const lions = app.createTeam2("lions", "kailua", 76);
const warriors = app.createTeam2("warriors", "kalihi", 75);
const raptors = app.createTeam2("raptors", "radford", 73);
const dolphins = app.createTeam2("dolphins", "waikele", 69); */

//prettier-ignore
//teamObjects.push(wyverns, menehune, knights, mules, lions, warriors, raptors, dolphins);
//prettier-ignore
//teamNames.push("wyverns", "menehune", "knights", "mules", "lions", "warrios", "raptors", "dolphins");

export const main = {

  chooseTeams(team1, team2, team3, team4, team5, team6, team7, team8) {
    const team_1 = TeamFactory.createTeam2(team1, "manoa", 72);
    const team_2 = TeamFactory.createTeam2(team2, "mililani", 77);
    const team_3 = TeamFactory.createTeam2(team3, "castle", 72);
    const team_4 = TeamFactory.createTeam2(team4, "leilehua", 76);
    const team_5 = TeamFactory.createTeam2(team5, "kailua", 76);
    const team_6 = TeamFactory.createTeam2(team6, "kalihi", 75);
    const team_7 = TeamFactory.createTeam2(team7, "radford", 73);
    const team_8 = TeamFactory.createTeam2(team8, "waikele", 77);
    teamObjects.push(team_1, team_2, team_3, team_4, team_5, team_6, team_7, team_8);
    //Store new Data Inside Local Storage
    this.updateLocalStorage(teamObjects);
  },

  getContenders() {
    for (var teamObject of teamObjects) {
      //Get The New Data From Local Storage
      const teamLS = teamObject.getFromLocalStorage();
      //prettier-ignore
      const teamObj = TeamFactory.createTeam(teamLS.name, teamLS.city, teamLS.strength, teamLS.speed, teamLS.agility, teamLS.endurance, teamLS.rating)
      //teamObj.printStats();
      contenders.push(teamObj);
    }
    return contenders;
  },

  updateLocalStorage(teams) {
    for (var team of teams) {
      team.addToLocalStorage();
    }
  },

  addEventListeners() {
    //Start Simulation
    if (startSimulationBtn) {
      startSimulationBtn.addEventListener("click", () => {
        console.log("start button clicked!");
        Tournament.init();
      }, {once: true});
    }
  },

};

//main.init();

main.chooseTeams(
  "lunas",
  "bulldogs",
  "mules",
  "sharks",
  "wyverns",
  "cougars",
  "lions",
  "menehune"
);
main.getContenders();

// Draw The Canvas
Bracket_Canvas.init();
// Initialize Teams
Bracket_Content.init();

main.addEventListeners();

FirebaseObj.init();
