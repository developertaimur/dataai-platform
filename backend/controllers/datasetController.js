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

    // Multer uploaded file ka size bytes me deta hai
    const fileSize =
    uploadedFile.size;

    const sql =
    `INSERT INTO datasets
    (user_id, dataset_name, original_file_name, file_type, file_path, file_size, status)
    VALUES (?, ?, ?, ?, ?, ?, ?)`;

    db.query(
        sql,
        [
            userId,
            datasetName,
            uploadedFile.originalname,
            fileType,
            uploadedFile.path,
            fileSize,
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
    COUNT(*) AS totalDatasets,
    COALESCE(SUM(file_size), 0) AS totalStorage
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
    creditsRemaining: 0,
    queriesThisMonth: 0,
    storageUsed: formatFileSize(statsResult[0].totalStorage)
},

                recentDatasets: recentResult
            });

        });

    });

}

function formatFileSize(bytes){

    if(bytes === 0){
        return "0 Bytes";
    }

    if(bytes < 1024){
        return bytes + " Bytes";
    }

    if(bytes < 1024 * 1024){

        const kb = bytes / 1024;
        return kb.toFixed(2) + " KB";

    }

    if(bytes < 1024 * 1024 * 1024){

        const mb = bytes / (1024 * 1024);
        return mb.toFixed(2) + " MB";

    }

    const gb = bytes / (1024 * 1024 * 1024);
    return gb.toFixed(2) + " GB";

}


module.exports = {
    getMyDatasets,
    getSingleDataset,
    uploadDataset,
    deleteDataset,
    getDatasetStats
};