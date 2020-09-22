class Player {
  constructor(name, rating, strength, speed, agility, endurance) {
    this.name = name;
    this.rating = rating;
    this.strength = strength;
    this.speed = speed;
    this.agility = agility;
    this.endurance = endurance;
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
}
