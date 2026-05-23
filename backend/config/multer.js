// ===============================
// FILE: multer.js
// PURPOSE:
// Receive uploaded files and save
// them inside uploads folder
//
// FLOW:
// Frontend file
// ↓
// Multer receives file
// ↓
// Save in uploads folder
// ↓
// req.file available in controller
// ===============================

const multer =
require("multer");

const path =
require("path");


// Configure storage
const storage =
multer.diskStorage({

    destination: function(req, file, cb){

        cb(
            null,
            "uploads/"
        );

    },

    filename: function(req, file, cb){

        const uniqueName =
        Date.now() +
        "-" +
        file.originalname;

        cb(
            null,
            uniqueName
        );

    }

});


const upload =
multer({
    storage: storage
});


module.exports =
upload;