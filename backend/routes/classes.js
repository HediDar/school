const express = require("express");

const route = express.Router();
const Course = require("../models/course");
const User = require("../models/user");

const myClass = require("../models/class");

// business logic classes
// getAllClasses

route.get("", (req, res) => {
  console.log("get all classes bl");
  myClass
    .find()
    .populate("teacher")
    .populate("course")
    .populate("students")
    .then((docs) => {
      res.json({ classes: docs });
    });
});

// addClass

route.post("", (req, res) => {
  console.log("add class bl");
  console.log(req.body);

  try {
    Course.findById(req.body.courseId).then((course) => {
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }

      //   we cant do team:req.body.teamId, because req.body.teamId est un string alors que l'attribut team doit etre object id
      req.body.course = course._id;
      User.findById(req.body.teacherId).then((teacher) => {
        if (!teacher) {
          return res.status(404).json({ message: "Teacher not found" });
        }
        //   we cant do team:req.body.teamId, because req.body.teamId est un string alors que l'attribut team doit etre object id
        req.body.teacher = teacher._id;

        const classs = new myClass(req.body);

        classs.save((err, doc) => {
          for (let i = 0; i < req.body.students.length; i++) {
            if (i == 0) {
              classs.students = [];
            }
            User.findById(req.body.students[i]).then((student) => {
              if (!student) {
                return res.status(404).json({ message: "Student not found" });
              }

              classs.students.push(student);

              if (i == req.body.students.length - 1) {
                console.log(0, classs);
                classs.save();
                res.status(201).json({ message: "class added succesfully" });
              }
            });
          }
        });
      });
    });
  } catch (error) {
    console.log(error);
  }
});

// delete class
route.delete("/:id", (req, res) => {
  // traitement de la requete
  console.log("in delete class logic");
  myClass.deleteOne({ _id: req.params.id }).then((response) => {
    response.deletedCount == 1
      ? res.json({ message: "deleted succesfully" })
      : res.json({ message: "error" });
  });
});

module.exports = route;
