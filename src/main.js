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

/* wyverns.addToLocalStorage();
menehune.addToLocalStorage();
knights.addToLocalStorage();
mules.addToLocalStorage();
lions.addToLocalStorage();
warriors.addToLocalStorage();
raptors.addToLocalStorage();
dolphins.addToLocalStorage(); */

export const main = {
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
};

main.getContenders();
bracket.init();

const wyvernsData = contenders[0].getFromLocalStorage();
const menehuneData = contenders[1].getFromLocalStorage();
const winner = Tournament.playGame(wyvernsData, menehuneData);

console.log("WINNER: " + winner.name + "!");
