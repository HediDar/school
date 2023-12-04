const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
  name: String,
  description: String,
  duration: String,
  image: String,
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const course = mongoose.model("Course", courseSchema);

module.exports = course;
