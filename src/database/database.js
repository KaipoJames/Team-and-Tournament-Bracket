import { functions as Functions } from "../functions.js";
import { playerFactory } from "../main_objects/player.js";

//Create an instance of the firebase realtime database
var database = firebase.database();
//const jeremy = playerFactory.createPlayer("jeremy", "suva", 65);

export const firebaseObj = {
  init() {
    console.log("initialized reference to firebase.database()");
    //this.writePlayerToDatabase(jeremy);
  },

  writePlayerToDatabase(player) {
    const uniqueID = Functions.generateUniqueID();
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
  },
};
