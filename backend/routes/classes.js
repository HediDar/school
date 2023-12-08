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

// getAllClasses

route.get("/teacher/:id", (req, res) => {
  console.log("get classes by id teacher");

  myClass
    .find({ teacher: req.params.id })
    .populate("course")
    .populate("students")
    .populate("teacher")
    .then((docs) => {
      if (docs) {
        res.json({ classes: docs });
      } else res.json({ classes: [] });
    });
});

// addClass

route.post("", (req, res) => {
  console.log("add class bl");

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

// update class
route.put("", (req, res) => {
  console.log("update class");

  try {
    Course.findById(req.body.courseId).then((course) => {
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }

      //   we cant do team:req.body.teamId, because req.body.teamId est un string alors que l'attribut team doit etre object id
      req.body.course = course._id;

      myClass.findById(req.body._id).then(async (cls) => {
        if (!cls) {
          return res.status(404).json({ message: "Class not found" });
        }
        req.body._id = cls._id;

        User.findById(req.body.teacherId).then(async (teacher) => {
          if (!teacher) {
            return res.status(404).json({ message: "Teacher not found" });
          }
          //   we cant do team:req.body.teamId, because req.body.teamId est un string alors que l'attribut team doit etre object id
          req.body.teacher = teacher._id;

          // const classs = new myClass(req.body);

          const classs = new myClass({
            _id: req.body._id, // Assuming you want to update the existing document
            course: course._id,
            teacher: teacher._id,
            description: req.body.description,
            name: req.body.name,
          });
          classs.students = [];

          for (let i = 0; i < req.body.students.length; i++) {
            await User.findById(req.body.students[i]).then((student) => {
              if (!student) {
                return res.status(404).json({ message: "Student not found" });
              }

              classs.students.push(student);

              if (i == req.body.students.length - 1) {
                myClass
                  .updateOne({ _id: req.body._id }, classs)
                  .then((response) => {
                    console.log(response);
                    response.nModified == 1
                      ? res.json({ message: "class modified succesfully" })
                      : res.json({ message: "error" });
                  });
              }
            });
          }
          if (req.body.students.length == 0) {
            myClass
              .updateOne({ _id: req.body._id }, classs)
              .then((response) => {
                console.log(response);
                response.nModified == 1
                  ? res.json({ message: "class modified succesfully" })
                  : res.json({ message: "error" });
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

//business logic get class by id
route.get("/:id", (req, res) => {
  // traitement de la requete

  console.log("business logic du getClassById");
  //{_id:req.params.id}== la condition de recherche
  myClass
    .findOne({ _id: req.params.id })
    .populate("students")
    .populate("course")
    .populate("teacher")
    .then((doc) => {
      res.json({ class: doc });
    });
});

//business logic get classes by id student
route.get("/studentClasses/:id", (req, res) => {
  // traitement de la requete

  console.log("business logic du getClassByIdstudent");
  //{_id:req.params.id}== la condition de recherche
  myClass
    .find()
    .populate("course")
    .populate("teacher")
    .then((docs) => {
      if (!docs) {
        res.json({ message: "no data found" });
      }

      let myNewTab = [];

      for (let i = 0; i < docs.length; i++) {
        for (let j = 0; j < docs[i].students.length; j++) {
          if (docs[i].students[j]._id == req.params.id) {
            myNewTab.push(docs[i]);
            break;
          }
        }
      }

      myNewTab.length > 0
        ? res.json({ classes: myNewTab, message: "data found" })
        : res.json({ message: "no data found" });
    });
});

//business logic get classes by id student
route.get("/studentClassesByPhone/:phone", (req, res) => {
  // traitement de la requete

  console.log("business logic du getClassByPhoneCHild");
  //{_id:req.params.id}== la condition de recherche
  myClass
    .find()
    .populate("students")
    .populate("course")
    .populate("teacher")
    .then((docs) => {
      if (!docs) {
        res.json({ message: "no data found" });
      }
      let myNewTab = [];
      let idStudent;

      for (let i = 0; i < docs.length; i++) {
        for (let j = 0; j < docs[i].students.length; j++) {
          if (docs[i].students[j].telephone == req.params.phone) {
            idStudent = docs[i].students[j]._id;
            myNewTab.push(docs[i]);
            break;
          }
        }
      }
      // console.log("test",myNewTab[0].student_id);
      myNewTab.length > 0
        ? res.json({
            classes: myNewTab,
            idStudent: idStudent,
            message: "data found",
          })
        : res.json({ message: "no data found" });
    });
});

module.exports = route;
