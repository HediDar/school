const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  telephone: String,
  childTelephone: String,
  speciality: String,
  adresse: String,
  role: String,
  cv: String,
  avatar: String,
  status: String,
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

const user = mongoose.model("User", userSchema);

module.exports = user;
