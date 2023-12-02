const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  telephone: String,
  speciality: String,
  adresse: String,
  role: String,
  cv: String,
  avatar: String,
});

const user = mongoose.model("User", userSchema);

module.exports = user;
