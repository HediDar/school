const express = require("express");

const route = express.Router();
const User = require("../models/user");
const Evaluation = require("../models/evaluation");

const myClass = require("../models/class");

// business logic evaluations
// addOrEdit evaluation

route.post("", (req, res) => {
  console.log("add or edit bl");
  console.log(req.body);
  let addBool = false;

  Evaluation.findOne({ class: req.body.class, student: req.body.student }).then(
    (evaluation) => {
      evaluation ? (addBool = false) : (addBool = true);
      try {
        myClass.findById(req.body.class).then((foundClass) => {
          if (!foundClass) {
            return res.status(404).json({ message: "Class not found" });
          } else {
            req.body.class = foundClass._id;
            User.findById(req.body.student).then((foundStudent) => {
              if (!foundStudent) {
                return res.status(404).json({ message: "User not found" });
              } else {
                req.body.student = foundStudent._id;
                const evaluation = new Evaluation(req.body);
                if (addBool) {
                  evaluation.save((err, doc) => {
                    doc
                      ? res.json({ message: "evaluation added succesfully" })
                      : res.json({ message: "An error occured" });
                  });
                } else {
                  Evaluation.updateOne(
                    { _id: req.body.idEvaluation },
                    req.body
                  ).then((response) => {
                    response.nModified == 1
                      ? res.json({ message: "evaluation modified succesfully" })
                      : res.json({ message: "error" });
                  });
                }
              }
            });
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  );
});

route.get("/:idStudent/:idClass", (req, res) => {
  console.log("in get user by id BL");
  Evaluation.findOne({
    class: req.params.idClass,
    student: req.params.idStudent,
  }).then((doc) => {
    doc
      ? res.json({ evaluation: doc })
      : res.json({ message: "no evaluation" });
  });
});

route.get("", (req, res) => {
  console.log("get all evaluations bl");
  Evaluation.find().then((docs) => {
    res.json({ evaluations: docs });
  });
});

// get evaluations by id student and id class
route.get("/:idStudent/:idClass", (req, res) => {
  console.log("get evaluations by id student");
  Evaluation.findOne({
    student: req.params.idStudent,
    class: req.params.idClass,
  })
  .then((doc) => {
    doc
      ? res.json({ evaluations: doc, message: "evaluation found" })
      : res.json({ message: "No evaluation found" });
  });
});

module.exports = route;
