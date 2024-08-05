const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  email: String,
  password: String,
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
