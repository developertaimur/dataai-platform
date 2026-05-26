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



// Get single dataset details
function getSingleDataset(req, res){

    const datasetId =
    req.params.id;

    const userId =
    req.user.id;

    const sql =
    `
    SELECT *
    FROM datasets
    WHERE id = ?
    AND user_id = ?
    `;

    db.query(
        sql,
        [datasetId, userId],

        function(error, result){

            if(error){

                return res.status(500).json({
                    message: "Failed to fetch dataset"
                });

            }

            if(result.length === 0){

                return res.status(404).json({
                    message: "Dataset not found"
                });

            }

            res.status(200).json({
                message: "Dataset fetched successfully",
                dataset: result[0]
            });

        }
    );

}


// Delete dataset
function deleteDataset(req, res){

    const datasetId =
    req.params.id;

    const userId =
    req.user.id;

    const sql =
    `
    DELETE FROM datasets
    WHERE id = ?
    AND user_id = ?
    `;

    db.query(
        sql,
        [datasetId, userId],

        function(error, result){

            if(error){

                return res.status(500).json({
                    message: "Failed to delete dataset"
                });

            }

            if(result.affectedRows === 0){

                return res.status(404).json({
                    message: "Dataset not found"
                });

            }

            res.status(200).json({
                message: "Dataset deleted successfully"
            });

        }
    );

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


// Get dashboard statistics for logged-in user
function getDatasetStats(req, res){

    // JWT token se logged-in user ki id milti hai
    const userId =
    req.user.id;

    // Total datasets count karne ke liye query
    const statsSql =
    `
    SELECT 
        COUNT(*) AS totalDatasets
    FROM datasets
    WHERE user_id = ?
    `;

    // Dashboard par recent 6 datasets dikhane ke liye query
    const recentSql =
    `
    SELECT 
        id,
        dataset_name,
        original_file_name,
        file_type,
        status,
        created_at
    FROM datasets
    WHERE user_id = ?
    ORDER BY created_at DESC
    LIMIT 6
    `;

    db.query(statsSql, [userId], function(error, statsResult){

        if(error){

            return res.status(500).json({
                message: "Failed to fetch dashboard stats"
            });

        }

        db.query(recentSql, [userId], function(error, recentResult){

            if(error){

                return res.status(500).json({
                    message: "Failed to fetch recent datasets"
                });

            }

            res.status(200).json({
                message: "Dashboard stats fetched successfully",

                stats: {
                    totalDatasets: statsResult[0].totalDatasets,

                    // Ye abhi dummy rakhe hain, later billing/chat module se real karenge
                    creditsRemaining: 0,
                    queriesThisMonth: 0,
                    storageUsed: "0 MB"
                },

                recentDatasets: recentResult
            });

        });

    });

}


module.exports = {
    getMyDatasets,
    getSingleDataset,
    uploadDataset,
    deleteDataset,
    getDatasetStats
};