import { app } from "./team.js";

const teams = [];

// name, city, rating, strength, speed, agility, endurance
const sharks = app.createTeam1("sharks", "honolulu", 68, 79, 72, 78);
const menehune = app.createTeam2("menehune", "mililani", 78);
const knights = app.createTeam2("knights", "castle", 72);
const mules = app.createTeam2("mules", "leilehua", 79);
const lunas = app.createTeam2("lunas", "lahaina", 74);
const warriors = app.createTeam2("warriors", "kalihi", 75);
const cougars = app.createTeam2("kaiser", "castle", 73);
const bulldogs = app.createTeam2("bulldogs", "pearlridge", 69);

teams.push(
  sharks,
  menehune,
  knights,
  mules,
  lunas,
  warriors,
  cougars,
  bulldogs
);

/* sharks.addToLocalStorage();
menehune.addToLocalStorage();
knights.addToLocalStorage();
mules.addToLocalStorage();
lunas.addToLocalStorage();
warriors.addToLocalStorage();
cougars.addToLocalStorage();
bulldogs.addToLocalStorage(); */

for (var team of teams) {
  team.getFromLocalStorage();
  team.printStats();
}
