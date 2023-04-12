const express = require("express")
const router = express.Router()

const sql = require("../models/db.js");

router.post("/getUniversityData", (req, res) => {
    if (!req.body.universityName) {
        res.status(500).send({
          message: "Missing University Name."
        });
    }
    
    // Find target university in the database
    sql.query("SELECT DISTINCT * FROM universities WHERE universityName = ?", req.body.universityName, (err, data) => {
        if (err) {
            console.log("Error getting User University: ", { err: err.message});
        }
        else {
          res.status(200).send(data);
        }
    });
});

router.post("/setUniversityData", (req, res) => {
    if (!req.body.university) {
        res.status(500).send({
          message: "Missing University data."
        });
    }
    
    // Find target university in the database
    sql.query("UPDATE universities SET description = ?, numOfStudents = ?, locationName = ? WHERE universityName = ?", [req.body.university.description, req.body.university.numOfStudents, req.body.university.locationName, req.body.university.universityName], (err, data) => {
        if (err) {
            console.log("Error setting User University: ", { err: err.message});
        }
        else {
          res.status(200).send(data);
        }
    });
});

router.post("/getAllUniversities", (req, res) => {
    // Find target user in the database
    sql.query("SELECT DISTINCT universityName FROM universities", (err, data) => {
        if (err) {
            console.log("Error getting Universities: ", { err: err.message });
        }
        else {
          res.status(200).send(data);
        }
    });
});


module.exports = router;