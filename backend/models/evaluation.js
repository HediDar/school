const mongoose = require("mongoose");

const evaluationSchema = mongoose.Schema({
  evaluation: String,
  mark: Number,

  class: { type: mongoose.Schema.Types.ObjectId, ref: "Class" },
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const evaluation = mongoose.model("Evaluation", evaluationSchema);

module.exports = evaluation;
