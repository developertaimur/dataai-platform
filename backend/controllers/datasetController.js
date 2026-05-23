// ===============================
// FILE: datasetController.js
// PURPOSE: Dataset related backend logic
// FLOW:
// Frontend request
// -> authMiddleware verifies token
// -> req.user.id gives logged-in user id
// -> controller fetches datasets from MySQL
// -> response sends datasets back
// ===============================

const db =
require("../config/db");


// Get logged-in user's datasets
function getMyDatasets(req, res){

    const userId =
    req.user.id;

    const sql =
    "SELECT * FROM datasets WHERE user_id = ? ORDER BY created_at DESC";

    db.query(sql, [userId], function(error, result){

        if(error){

            return res.status(500).json({
                message: "Failed to fetch datasets"
            });

        }

        res.status(200).json({
            message: "Datasets fetched successfully",
            datasets: result
        });

    });

}


// Upload dataset file and save record in database
function uploadDataset(req, res){

    const userId =
    req.user.id;

    const datasetName =
    req.body.datasetName;

    const uploadedFile =
    req.file;


    if(!uploadedFile){

        return res.status(400).json({
            message: "No file uploaded"
        });

    }


    const fileType =
    uploadedFile.originalname.split(".").pop();


    const sql =
    `INSERT INTO datasets
    (user_id, dataset_name, original_file_name, file_type, file_path, status)
    VALUES (?, ?, ?, ?, ?, ?)`;


    db.query(
        sql,
        [
            userId,
            datasetName,
            uploadedFile.originalname,
            fileType,
            uploadedFile.path,
            "Ready"
        ],

        function(error, result){

            if(error){

                return res.status(500).json({
                    message: "Dataset upload failed"
                });

            }


            res.status(201).json({
                message: "Dataset uploaded successfully",
                datasetId: result.insertId
            });

        }
    );

}


module.exports = {
    getMyDatasets,
    uploadDataset
};