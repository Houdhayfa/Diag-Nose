const mongoose = require("mongoose");
const config = require("config");

const connectDB = async () => {
  try {
    await mongoose.connect(config.get("MONGOURI"), {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true
    });
    console.log("CONNECTED TO DATABASE SUCCESSFULLY...");
  } catch (error) {
    console.log("CONNECTION TO DATABASE FAILED");
    console.log(error);
  }
};

module.exports = connectDB;