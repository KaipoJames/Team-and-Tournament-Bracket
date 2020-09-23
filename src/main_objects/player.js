import { app as App } from "./team.js";

class Player {
  //prettier-ignore
  constructor(firstName, lastName, rating, strength, speed, agility, endurance, currentTeam) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.rating = rating;
    this.strength = strength;
    this.speed = speed;
    this.agility = agility;
    this.endurance = endurance;
    this.currentTeam = currentTeam;
  }

  train(trait) {
    //Player has 6% chance to gain 1 strength;
    const rand = Math.floor(Math.random() * 100);
    if (rand <= 6) {
      switch (trait) {
        case "strength":
          console.log(`Nice! ${this.name} gained 1 strength!`);
          this.strength += 1;
        case "speed":
          console.log(`Nice! ${this.name} gained 1 strength!`);
          this.speed += 1;
        case "agility":
          console.log(`Nice! ${this.name} gained 1 strength!`);
          this.agility += 1;
        case "endurance":
          console.log(`Nice! ${this.name} gained 1 strength!`);
          this.endurance += 1;
      }
    } else {
      console.log(`Good training session. Keep it up to increase your stats!`);
    }
  }

  calculateStats(rating) {
    const stats = [];
    var sum, average, strength, speed, agility, endurance;
    var min = rating - Math.floor(Math.random() * 10);
    var max = rating + Math.floor(Math.random() * 10);
    while (true) {
      strength = playerFactory.randomNumber(min, max);
      speed = playerFactory.randomNumber(min, max);
      agility = playerFactory.randomNumber(min, max);
      endurance = playerFactory.randomNumber(min, max);
      sum = strength + speed + agility + endurance;
      average = sum / 4;
      if (average == rating) {
        stats.push(strength, speed, agility, endurance);
        break;
      }
    }
    return stats;
  }
}

export const playerFactory = {
  //prettier-ignore
  createPlayer(firstName, lastName, rating) {
    //prettier-ignore
    const player = new Player(firstName, lastName, rating);
    player.strength = player.calculateStats(rating)[0];
    player.speed = player.calculateStats(rating)[0];
    player.agility = player.calculateStats(rating)[0];
    player.endurance = player.calculateStats(rating)[0];
    player.currentTeam = "unassigned";
    return player;
  },

  randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },
};
