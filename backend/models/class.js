const mongoose = require("mongoose");

const classSchema = mongoose.Schema({
  name: String,
  description: String,

  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const myClass = mongoose.model("Class", classSchema);

module.exports = myClass;
