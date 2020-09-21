import { Team, app } from "./team.js";
import { bracket } from "./bracket.js";
import { tournament as Tournament } from "./tournament.js";

const teamObjects = [];
const teamNames = [];
const contenders = [];

// name, city, rating, strength, speed, agility, endurance
const wyverns = app.createTeam2("wyverns", "manoa", 70);
const menehune = app.createTeam2("menehune", "mililani", 78);
const knights = app.createTeam2("knights", "castle", 72);
const mules = app.createTeam2("mules", "leilehua", 79);
const lions = app.createTeam2("lions", "kailua", 76);
const warriors = app.createTeam2("warriors", "kalihi", 75);
const raptors = app.createTeam2("raptors", "radford", 73);
const dolphins = app.createTeam2("dolphins", "waikele", 69);

//prettier-ignore
teamObjects.push(wyverns, menehune, knights, mules, lions, warriors, raptors, dolphins);
//prettier-ignore
teamNames.push("wyverns", "menehune", "knights", "mules", "lions", "warrios", "raptors", "dolphins");

export const main = {
  init() {
    this.updateLocalStorage();
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

  updateLocalStorage() {
    wyverns.addToLocalStorage();
    menehune.addToLocalStorage();
    knights.addToLocalStorage();
    mules.addToLocalStorage();
    lions.addToLocalStorage();
    warriors.addToLocalStorage();
    raptors.addToLocalStorage();
    dolphins.addToLocalStorage();
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

    const winner1 = Tournament.playGame(teamOne, teamTwo);
    const winner2 = Tournament.playGame(teamThree, teamFour);
    const winner3 = Tournament.playGame(teamFive, teamSix);
    const winner4 = Tournament.playGame(teamSeven, teamEight);

    const semiWinner1 = Tournament.playGame(winner1, winner2);
    const semiWinner2 = Tournament.playGame(winner3, winner4);

    const finalWinner = Tournament.playGame(semiWinner1, semiWinner2);

    console.log("\nSemi-Finals!");
    console.log("WINNER 1: " + winner1.name + "!");
    console.log("WINNER 2: " + winner2.name + "!");
    console.log("WINNER 3: " + winner3.name + "!");
    console.log("WINNER 4: " + winner4.name + "!");

    console.log("\nFinals!");
    console.log("WINNER 1: " + semiWinner1.name + "!");
    console.log("WINNER 2: " + semiWinner2.name + "!");

    console.log("Champion!!!");
    console.log("WINNER 1: " + finalWinner.name + "!");
  },
};

//main.init();
main.getContenders();
bracket.init();
main.runTournamentSimulation();
