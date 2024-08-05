const { default: mongoose } = require("mongoose");

require("dotenv").config();

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("CONNECTED TO DB");
  } catch (error) {
    console.log("UNABLE TO CONNECT DB");
  }
};

module.exports = connectMongoDB;
