const bcrypt = require("bcrypt");
const saltRounds = 10;

async function generateHash(password) {
  let hash = await new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, async (err, hash) => {
      if (err) reject(err);
      resolve(hash);
    });
  });
  return hash;
}

module.exports = { generateHash };
