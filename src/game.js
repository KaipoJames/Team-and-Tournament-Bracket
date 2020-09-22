import { Bracket_Content } from "./bracket.js";

export const Game = {
  init() {
    console.log("Game Object Initialized");
  },
  playGame(team1, team2) {
    // Both Teams Start With 0 Points
    let team1_score = team1.points;
    let team2_score = team2.points;
    // Print out initial scores of teams
    console.log(team1.name + " Score: " + team1_score);
    console.log(team2.name + " Score: " + team2_score);
    // Add Scores For Each Team. Each team has 4 tries to score.
    for (let i = 1; i < 5; i++) {
      console.log("\nQuarter " + i);
      let score_1 = this.scoreAttempt(team1.rating, team1.points);
      let score_2 = this.scoreAttempt(team2.rating, team2.points);
      team1_score += score_1;
      team2_score += score_2;
      console.log(team1.name + ": " + team1_score);
      console.log(team2.name + ": " + team2_score);
    }
    //Print the final Results
    console.log(team1.name + " Updated Score: " + team1_score);
    console.log(team2.name + " Updated Score: " + team2_score);
    //Return the Winner!
    if (team1_score != team2_score) {
      const winner = this.returnWinner(team1, team1_score, team2, team2_score);
      return winner;
    } else {
      console.log("Overtime!");
      const choice = Math.round(Math.random() * 20);
      if (choice >= 10) {
        team1_score += 5;
        console.log(team1.name + " Final Score: " + team1_score);
        console.log(team2.name + " Final Score: " + team2_score);
        return team1;
      } else {
        team2_score += 5;
        console.log(team1.name + " Final Score: " + team1_score);
        console.log(team2.name + " Final Score: " + team2_score);
        return team2;
      }
    }
  },

  scoreAttempt(teamRating, teamScore) {
    var min = teamRating - 20;
    var max = teamRating + 10;
    var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log(randomNumber);
    if (randomNumber >= 79) {
      teamScore += 10;
      return teamScore;
    }
    if (randomNumber >= 70 && randomNumber < 79) {
      teamScore += 6;
      return teamScore;
    }
    if (randomNumber >= 60 && randomNumber < 70) {
      teamScore += 4;
      return teamScore;
    }
    if (randomNumber <= 59) {
      return teamScore;
    }
  },

  returnWinner(team1, team1_Score, team2, team2_Score) {
    if (team1_Score > team2_Score) {
      Bracket_Content.postGameAddClasses(team1, team2);
    }
    if (team2_Score > team1_Score) {
      Bracket_Content.postGameAddClasses(team2, team1);
    }
    if (team1_Score > team2_Score) {
      return team1;
    } else {
      return team2;
    }
  },
};
