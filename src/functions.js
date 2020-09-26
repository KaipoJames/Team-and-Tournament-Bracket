export const functions = {
  generatePlayerID() {
    const pre = this.generateMixedId().substr(2, 7);
    const prefix = Date.now();
    const mid = this.generateMixedId();
    const randomString = (Math.random() * 100).toFixed(10);
    const suffix = randomString.replace(".", "");
    const uniqueID = pre + "-" + prefix + "-" + mid + "-" + suffix;
    return uniqueID;
  },

  generateTeamID() {
    const pre = this.generateMixedId().substr(1, 5);
    const post = Date.now();
    const uniqueID = pre + "-" + post;
    return uniqueID;
  },

  generateMixedId() {
    let id = "";
    const letters =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for (let i = 0; i < letters.length / 2; i++) {
      const randChar = letters.charAt(
        Math.floor(Math.random() * letters.length)
      );
      id += randChar;
    }
    return id;
  },

  randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },
};
