const express = require('express');
const app = express();
const cors = require("cors")
require("dotenv").config();
const PORT = process.env.PORT || 3001;

//allows json to be read from req.body
app.use(express.json());

//connects to frontend
app.use(cors());

//Routes
app.use('/users', require('./routes/Users.js'));

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});

