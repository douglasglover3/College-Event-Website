const express = require("express")
const router = express.Router()

const sql = require("../models/db.js");
const User = require("../models/Users.js");

router.post("/createUser", (req, res) => {
  // Validate request
  if (!req.body.userID) {
    res.status(400).send({
      message: "Missing User ID."
    });
  }
  else if (req.body.userID.length < 4) {
    res.status(400).send({
      message: "User ID is too short"
    });
  }
  if (!req.body.university) {
    res.status(400).send({
      message: "Missing University."
    });
  }
  if (!req.body.type) {
    res.status(500).send({
      message: "Type is missing."
    });
  }

  // Create a new user
  const newUser = new User({
    userID: req.body.userID,
    hashedPass: req.body.hashedPass,
    university: req.body.university,
    type: req.body.type
  });

  // Find if userID already exists
  sql.query("SELECT * FROM Users WHERE userID = ?", newUser.userID, (err, data) => {
    if (err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the user."
        });
        console.log("Error creating User: ", { err: err.message, ...newUser });
    }
    //No user with this userID exists
    else if(data.length == 0) {
      // Save user in the database
      sql.query("INSERT INTO users SET ?", newUser, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the user."
            });
            console.log("Error creating User: ", { err: err.message, ...newUser });
        }
        else {
            res.status(200).send(data);
            console.log("Successfully created User: ", { ...newUser });
        }
      });
    }
    //Userid is taken
    else {
      res.status(400).send({
        message:
            "User ID is taken."
      });
      console.log("User ID is taken.");
    }
  });
});

router.post("/loginUser", (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  //Build target user
  const targetUser = new User({
    userID: req.body.userID,
    hashedPass: req.body.hashedPass,
  });

  // Find target user in the database
  sql.query("SELECT * FROM Users WHERE userID = ?", targetUser.userID, (err, data) => {
      if (err) {
          res.status(500).send({
              message:
                  err.message || "Some error occurred while logging in."
          });
          console.log("Error logging in User: ", { err: err.message, ...targetUser });
      }
      //User found
      else if(data.length != 0) {
        //Password correct
        if(data[0].hashedPass === targetUser.hashedPass)
        {
          res.status(200).send(data[0]);
          console.log("Successfully logged in User: ", { ...data[0] });
        }
        //Password Incorrect
        else {
          res.status(400).send({
            message:
                "Incorrect password."
          });
          console.log("Incorrect password.");
        }
      }
      //No user found
      else {
        res.status(400).send({
          message:
              "User not found."
        });
        console.log("User not found.");
      }
  });
});


module.exports = router;