const express = require("express")
const router = express.Router()

const sql = require("../models/db.js");
const User = require("../models/Users.js");

router.post("/createUser", (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a new user
    const newUser = new User({
      userID: req.body.userID,
      hashedPass: req.body.hashedPass,
      university: req.body.university
    });
  
    // Save Tutorial in the database
    sql.query("INSERT INTO users SET ?", newUser, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial."
            });
        }
        else {
            res.status(200).send(data);
            console.log("Successfully created User: ", { id: res.insertId, ...newUser });
        }
    });
  });

module.exports = router