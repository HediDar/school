const express = require("express");

const route = express.Router();
const Course = require("../models/course");
const User = require("../models/user");

const multer = require("multer");

const MIME_TYPE = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};

// multer configuration
const storage = multer.diskStorage({
  // destination
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE[file.mimetype];
    let error = new Error("Mime type is invalid");
    if (isValid) {
      error = null;
    }
    cb(null, "backend/files");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const extension = MIME_TYPE[file.mimetype];
    const imgName = name + "-" + Date.now() + "-crococoder-" + "." + extension;
    cb(null, imgName);
  },
});

// business logic courses
// getAllCourses

route.get("", (req, res) => {
  console.log("get all courses bl");
  Course.find().then((docs) => {
    res.json({ courses: docs });
  });
});

//business logic get course by id
route.get("/:id", (req, res) => {
  // traitement de la requete

  console.log("business logic du getCourseById");
  //{_id:req.params.id}== la condition de recherche
  Course.findOne({ _id: req.params.id }).then((doc) => {
    res.json({ course: doc });
  });
});

//business logic get courses by idTeacher
route.get("/myCourses/:id", (req, res) => {
  // traitement de la requete

  console.log("business logic du getCoursesByIdTeacher");

  console.log(req.params.id);

  try {
    User.findById(req.params.id)
      .populate("courses")
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        console.log("user courses", user.courses);
        res.json({ teacherCourses: user.courses });
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving courses", error: error.message });
  }

  //{_id:req.params.id}== la condition de recherche
  // Course.findOne({ _id: req.params.id }).then((doc) => {
  //   res.json({ course: doc });
  // });
});

//business logic add course
route.post("", multer({ storage: storage }).single("file"), (req, res) => {
  console.log("add course BL");

  try {
    User.findById(req.body.teacherId).then((user) => {
      if (!user) {
        return res.status(404).json({ message: "user not found" });
      }

      if (!req.file) {
        return res.json({
          message: "You must select a file for your user",
        });
      }

      req.body.image = `http://localhost:3000/files/${req.file.filename}`;

      //   we cant do user:req.body.userId, because req.body.userId est un string alors que l'attribut user doit etre object id
      req.body.teacher = user._id;

      const course = new Course(req.body);

      course.save((err, doc) => {
        user.courses.push(course);
        user.save();
        res.status(201).json({ message: "done" });
      });
    });
  } catch (error) {
    console.log(error);
  }
});

//business logic update COurse
route.put("", multer({ storage: storage }).single("file"), (req, res) => {
  console.log("update course BL");
  console.log(req.file);

  if (req.file) {
    req.body.image = `http://localhost:3000/files/${req.file.filename}`;
  }

  Course.updateOne({ _id: req.body.id }, req.body).then((response) => {
    response.nModified == 1
      ? res.json({ message: "course modified succesfully" })
      : res.json({ message: "error" });
  });

  // try {
  //   User.findById(req.body.teacherId).then((user) => {
  //     if (!user) {
  //       return res.status(404).json({ message: "user not found" });
  //     }

  //     if (!req.file) {
  //       return res.json({
  //         message: "You must select a file for your user",
  //       });
  //     }

  //     req.body.image = `http://localhost:3000/files/${req.file.filename}`;

  //     //   we cant do user:req.body.userId, because req.body.userId est un string alors que l'attribut user doit etre object id
  //     req.body.teacher = user._id;

  //     const course = new Course(req.body);

  //     course.save((err, doc) => {
  //       user.courses.push(course);
  //       user.save();
  //       res.status(201).json({ message: "done" });
  //     });
  //   });
  // } catch (error) {
  //   console.log(error);
  // }
});

// BL delete course by id

route.delete("/:id", (req, res) => {
  // traitement de la requete
  console.log("in delete course logic");
  Course.deleteOne({ _id: req.params.id }).then((response) => {
    response.deletedCount == 1
      ? res.json({ message: "deleted succesfully" })
      : res.json({ message: "error" });
  });
});

module.exports = route;
