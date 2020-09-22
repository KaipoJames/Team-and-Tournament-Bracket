import { Bracket_Content } from "./bracket.js";
import { Game } from "./game.js";

let winner = "";

export const tournament = {
  init() {
    Game.init();
    this.runTournament();
  },
  runTournament() {
    const contenders = this.getContenders();
    const quarterFinalists = this.playQuarterFinals(contenders);
    const semiFinalists = this.playSemiFinals(quarterFinalists);
    const champion = this.playFinals(semiFinalists);
    winner += champion.name;
  },

  getContenders() {
    const contenders = Bracket_Content.getContentfromMain();
    return contenders;
  },

  playQuarterFinals(contenders) {
    const winners = [];
    const teamOne = contenders[0];
    const teamTwo = contenders[1];
    const teamThree = contenders[2];
    const teamFour = contenders[3];
    const teamFive = contenders[4];
    const teamSix = contenders[5];
    const teamSeven = contenders[6];
    const teamEight = contenders[7];

    const winner1 = Game.playGame(teamOne, teamTwo);
    const winner2 = Game.playGame(teamThree, teamFour);
    const winner3 = Game.playGame(teamFive, teamSix);
    const winner4 = Game.playGame(teamSeven, teamEight);
    winners.push(winner1, winner2, winner3, winner4);
    Bracket_Content.advanceToSemis(winners);
    console.log("\nSemi-Finals!");
    console.log("WINNER 1: " + winner1.name + "!");
    console.log("WINNER 2: " + winner2.name + "!");
    console.log("WINNER 3: " + winner3.name + "!");
    console.log("WINNER 4: " + winner4.name + "!");
    return winners;
  },

  playSemiFinals(semi_contenders) {
    const semi_winners = [];
    const teamOne = semi_contenders[0];
    const teamTwo = semi_contenders[1];
    const teamThree = semi_contenders[2];
    const teamFour = semi_contenders[3];

    const semiWinner1 = Game.playGame(teamOne, teamTwo);
    const semiWinner2 = Game.playGame(teamThree, teamFour);
    semi_winners.push(semiWinner1, semiWinner2);
    Bracket_Content.advanceToFinals(semi_winners);
    console.log("\nFinals!");
    console.log("WINNER 1: " + semiWinner1.name + "!");
    console.log("WINNER 2: " + semiWinner2.name + "!");
    return semi_winners;
  },

  playFinals(finals_contenders) {
    const finalWinner = Game.playGame(
      finals_contenders[0],
      finals_contenders[1]
    );
    Bracket_Content.displayChampion(finalWinner);
    console.log("\nChampion!!!");
    console.log("WINNER: " + finalWinner.name + "!");
    return finalWinner;
  },
};
