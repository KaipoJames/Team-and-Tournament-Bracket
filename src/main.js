import { Team, app } from "./team.js";

const teamObjects = [];
const teamNames = [];

const contenders = [];

// name, city, rating, strength, speed, agility, endurance
const sharks = app.createTeam1("sharks", "honolulu", 68, 79, 72, 78);
const menehune = app.createTeam2("menehune", "mililani", 78);
const knights = app.createTeam2("knights", "castle", 72);
const mules = app.createTeam2("mules", "leilehua", 79);
const lunas = app.createTeam2("lunas", "lahaina", 74);
const warriors = app.createTeam2("warriors", "kalihi", 75);
const cougars = app.createTeam2("kaiser", "castle", 73);
const bulldogs = app.createTeam2("bulldogs", "pearlridge", 69);

//prettier-ignore
teamObjects.push(sharks, menehune, knights, mules, lunas, warriors, cougars, bulldogs);
//prettier-ignore
teamNames.push("sharks", "menehune", "knights", "mules", "lunas", "warrios", "cougars", "bulldogs")

/* sharks.addToLocalStorage();
menehune.addToLocalStorage();
knights.addToLocalStorage();
mules.addToLocalStorage();
lunas.addToLocalStorage();
warriors.addToLocalStorage();
cougars.addToLocalStorage();
bulldogs.addToLocalStorage(); */

for (var teamObject of teamObjects) {
  const teamData = teamObject.getFromLocalStorage();
  console.log(teamData);
}
