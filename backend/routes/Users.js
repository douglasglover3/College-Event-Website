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
  else if (!req.body.universityName) {
    res.status(400).send({
      message: "Missing University."
    });
  }
  else if (!req.body.userType) {
    res.status(500).send({
      message: "Type is missing."
    });
  }

  // Create a new user
  const newUser = new User({
    userID: req.body.userID,
    email: req.body.email,
    universityName: req.body.universityName,
    hashedPass: req.body.hashedPass,
    userType: req.body.userType
  });
  
  // Find if userID already exists
  sql.query("SELECT * FROM users WHERE userID = ?", newUser.userID, (err, data) => {
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
      sql.query("INSERT INTO users SET ?", newUser, (err, data2) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the user."
            });
            console.log("Error 1 creating User: ", { err: err.message, ...newUser });
        }
        else {
          res.status(200).send({
            userID: req.body.userID,
            universityName: req.body.universityName,
            type: req.body.userType
          });
          console.log("Successfully created User: ", req.body.userID, req.body.universityName, req.body.userType);
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
  sql.query("SELECT * FROM users WHERE userID = ?", targetUser.userID, (err, data) => {
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
          res.status(200).send({
            userID: data[0].userID,
            universityName: data[0].universityName,
            type: data[0].userType
          });
          console.log("Successfully logged in User: ", data[0].userID, data[0].universityName, data[0].userType);
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

router.post("/getRSOUsers", (req, res) => {
  if (!req.body.rsoName) {
      res.status(500).send({
        message: "Missing RSO Name."
      });
  }

  sql.query("SELECT * FROM users U WHERE EXISTS(SELECT * FROM membership M WHERE U.userID = M.userID AND M.rsoName = ?)", req.body.rsoName, (err, data) => {
      if (err) {
          res.status(500).send({
              message:
                  err.message || "Some error occurred while finding users."
          });
          console.log("Error getting users: ", { err: err.message });
      }
      else {
          res.status(200).send(data);
      }
  });
});

module.exports = router;