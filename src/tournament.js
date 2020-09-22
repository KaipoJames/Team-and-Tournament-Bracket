import { Bracket_Content } from "./bracket";

const tournament = {
  runTournament() {},

  getContenders() {
    const contenders = Bracket_Content.getContentfromMain();
    return contenders;
  },

  playQuarterFinals() {
    // Return 4 Teams
  },
  playSemiFinals() {
    // Return 2 Teams
  },
  playFinals() {
    // Return 1 Team
  },
};
