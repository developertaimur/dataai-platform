const express = require("express");

const cors = require("cors");

const dotenv = require("dotenv");

dotenv.config();

const db = require("./config/db");


// dotenv config
dotenv.config();


// express app
const app = express();


// middleware
app.use(cors());

app.use(express.json());


// test route
app.get("/", function(req, res){

    res.send("DataAI Backend Running");

});


// port
const PORT = process.env.PORT || 5000;


// server start
app.listen(PORT, function(){

    console.log(
        `Server running on port ${PORT}`
    );

});

const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);