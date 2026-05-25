// ===============================
// FILE: datasetRoutes.js
// PURPOSE: Dataset API routes
// FLOW:
// /api/datasets request
// -> verifyToken middleware
// -> datasetController function
// ===============================

const express =
require("express");

const router =
express.Router();

const datasetController =
require("../controllers/datasetController");

const verifyToken =
require("../middleware/authMiddleware");

const upload =
require("../config/multer");


// Get logged-in user's datasets
router.get(
    "/",
    verifyToken,
    datasetController.getMyDatasets
);


// Get single dataset
router.get(
    "/:id",
    verifyToken,
    datasetController.getSingleDataset
);

router.post(
    "/upload",
    verifyToken,
    upload.single("datasetFile"),
    datasetController.uploadDataset
);

// Delete dataset
router.delete(
    "/:id",
    verifyToken,
    datasetController.deleteDataset
);

module.exports = router;