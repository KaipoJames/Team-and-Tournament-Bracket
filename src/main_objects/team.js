import { functions as Functions } from "../functions.js";
import { playerFactory as PlayerFactory } from "./player.js";

export class Team {
  constructor(name, city, strength, speed, agility, endurance, rating) {
    this.name = name;
    this.city = city;
    this.strength = strength;
    this.speed = speed;
    this.agility = agility;
    this.endurance = endurance;
    this.rating = rating;
  }

  calculateRating() {
    let rating = Math.round(
      (this.strength + this.speed + this.agility + this.endurance) / 4
    );
    return rating;
  }

  calculateStats(rating) {
    const stats = [];
    var sum, average, strength, speed, agility, endurance;
    var min = rating - Math.floor(Math.random() * 10);
    var max = rating + Math.floor(Math.random() * 10);
    while (true) {
      strength = Functions.randomNumber(min, max);
      speed = Functions.randomNumber(min, max);
      agility = Functions.randomNumber(min, max);
      endurance = Functions.randomNumber(min, max);
      sum = strength + speed + agility + endurance;
      average = sum / 4;
      if (average == rating) {
        stats.push(strength, speed, agility, endurance);
        break;
      }
    }
    return stats;
  }

  printStats() {
    console.log("\nSTATS FOR TEAM: " + this.name);
    console.log("Team Rating = " + this.rating);
    console.log("Strength: " + this.strength);
    console.log("Speed: " + this.speed);
    console.log("Agility: " + this.agility);
    console.log("Endurance: " + this.endurance + "\n");
  }

  increaseStat(stat_name, amount) {
    switch (stat_name) {
      case "strength":
        this.strength += amount;
        break;
      case "speed":
        this.speed += amount;
        break;
      case "agility":
        this.agility += amount;
        break;
      case "endurance":
        this.endurance += amount;
        break;
    }
    this.updateRating(this.strength, this.speed, this.agility, this.endurance);
  }

  decreaseStat(stat_name, amount) {
    switch (stat_name) {
      case "strength":
        this.strength -= amount;
        break;
      case "speed":
        this.speed -= amount;
        break;
      case "agility":
        this.agility -= amount;
        break;
      case "endurance":
        this.endurance -= amount;
        break;
    }
    this.updateRating(this.strength, this.speed, this.agility, this.endurance);
  }

  updateRating(new_strength, new_speed, new_agility, new_endurance) {
    let new_rating = Math.round(
      (new_strength + new_speed + new_agility + new_endurance) / 4
    );
    this.strength = new_strength;
    this.speed = new_speed;
    this.agility = new_agility;
    this.endurance = new_endurance;
    this.rating = new_rating;
    this.addToLocalStorage();
  }

  changeName(newName) {
    this.name = newName;
  }
  changeCity(newCity) {
    this.city = newCity;
  }

  addToLocalStorage() {
    const localStorageContent = localStorage.getItem(this.name);
    let teamData;
    if (localStorageContent == null) {
      teamData = [];
    } else {
      //Get the data from local storage
      teamData = JSON.parse(localStorageContent);
    }
    localStorage.setItem(this.name, JSON.stringify(this));
  }

  getFromLocalStorage() {
    const localStorageContent = localStorage.getItem(this.name);
    let teamData;
    if (localStorageContent == null) {
      teamData = [];
    } else {
      //Get the data from local storage
      teamData = JSON.parse(localStorageContent);
    }
    //console.log(teamData);
    return teamData;
  }

  addIcon() {
    this.src = "/assets/img/" + this.name + ".png";
  }

  addNewPlayer(firstName, lastName, rating) {
    const newPlayer = PlayerFactory.createPlayer(firstName, lastName, rating);
    this.players.push(newPlayer);
  }
}

// Object containing Helper Methods
export const teamFactory = {
  createTeam(name, city, strength, speed, agility, endurance, rating) {
    //prettier-ignore
    const newTeam = new Team(name, city, strength, speed, agility, endurance, rating);
    newTeam.addIcon();
    newTeam.points = 0;
    return newTeam;
  },

  createTeam1(name, city, strength, speed, agility, endurance) {
    const newTeam = new Team(name, city, strength, speed, agility, endurance);
    const teamRating = newTeam.calculateRating();
    newTeam.rating = teamRating;
    newTeam.addIcon();
    newTeam.points = 0;
    return newTeam;
  },

  createTeam2(name, city, teamRating) {
    const newTeam = new Team(name, city);
    newTeam.strength = newTeam.calculateStats(teamRating)[0];
    newTeam.speed = newTeam.calculateStats(teamRating)[0];
    newTeam.agility = newTeam.calculateStats(teamRating)[0];
    newTeam.endurance = newTeam.calculateStats(teamRating)[0];
    newTeam.rating = teamRating;
    newTeam.addIcon();
    //newTeam.points = 0;
    return newTeam;
  },
};
