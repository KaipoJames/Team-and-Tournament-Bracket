import { Team, app } from "./team.js";
import { Bracket_Canvas, Bracket_Content } from "./bracket.js";
import { game as Game } from "./game.js";

const teamObjects = [];
const teamNames = [];
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
    const team_1 = app.createTeam2(team1, "manoa", 72);
    const team_2 = app.createTeam2(team2, "mililani", 77);
    const team_3 = app.createTeam2(team3, "castle", 72);
    const team_4 = app.createTeam2(team4, "leilehua", 76);
    const team_5 = app.createTeam2(team5, "kailua", 76);
    const team_6 = app.createTeam2(team6, "kalihi", 75);
    const team_7 = app.createTeam2(team7, "radford", 73);
    const team_8 = app.createTeam2(team8, "waikele", 77);
    teamObjects.push(team_1, team_2, team_3, team_4, team_5, team_6, team_7, team_8);
    this.updateLocalStorage(teamObjects);
  },

  getContenders() {
    for (var teamObject of teamObjects) {
      const teamLS = teamObject.getFromLocalStorage();
      //prettier-ignore
      const teamObj = app.createTeam(teamLS.name, teamLS.city, teamLS.strength, teamLS.speed, teamLS.agility, teamLS.endurance, teamLS.rating)
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

  runTournamentSimulation() {
    const teamOne = contenders[0].getFromLocalStorage();
    const teamTwo = contenders[1].getFromLocalStorage();
    const teamThree = contenders[2].getFromLocalStorage();
    const teamFour = contenders[3].getFromLocalStorage();
    const teamFive = contenders[4].getFromLocalStorage();
    const teamSix = contenders[5].getFromLocalStorage();
    const teamSeven = contenders[6].getFromLocalStorage();
    const teamEight = contenders[7].getFromLocalStorage();

    const winner1 = Game.playGame(teamOne, teamTwo);
    const winner2 = Game.playGame(teamThree, teamFour);
    const winner3 = Game.playGame(teamFive, teamSix);
    const winner4 = Game.playGame(teamSeven, teamEight);

    const semiWinner1 = Game.playGame(winner1, winner2);
    const semiWinner2 = Game.playGame(winner3, winner4);

    const finalWinner = Game.playGame(semiWinner1, semiWinner2);

    console.log("\nSemi-Finals!");
    console.log("WINNER 1: " + winner1.name + "!");
    console.log("WINNER 2: " + winner2.name + "!");
    console.log("WINNER 3: " + winner3.name + "!");
    console.log("WINNER 4: " + winner4.name + "!");

    console.log("\nFinals!");
    console.log("WINNER 1: " + semiWinner1.name + "!");
    console.log("WINNER 2: " + semiWinner2.name + "!");

    console.log("\nChampion!!!");
    console.log("WINNER 1: " + finalWinner.name + "!");
  },
};

//main.init();

main.chooseTeams(
  "wyverns",
  "dolphins",
  "knights",
  "mules",
  "warriors",
  "lions",
  "raptors",
  "menehune"
);
main.getContenders();
Bracket_Canvas.init();
Bracket_Content.init();
main.runTournamentSimulation();
