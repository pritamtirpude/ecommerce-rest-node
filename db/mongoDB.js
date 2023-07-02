const mongoose = require("mongoose");

require("dotenv").config();

const MONGO_URL = process.env.MONGO_URL;

mongoose.connection.once("open", () => {
  console.log("MongoDB Connection Ready!");
});

mongoose.connection.on("error", (err) => {
  console.log({ err });
});

const mongoDBConnect = async () => {
  mongoose.set("strictQuery", true);

  await mongoose.connect(MONGO_URL);
};

module.exports = mongoDBConnect;
