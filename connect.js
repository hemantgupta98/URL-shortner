const mongoose = require("mongoose");

async function conectToMongoDB(url) {
  return mongoose.connect(url);
}

module.exports = {
  conectToMongoDB,
};
