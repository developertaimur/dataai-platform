const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");

// router.post("/register", authController.registerUser);
router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.put("/update-password", authController.updatePassword);
router.delete("/delete-account/:id", authController.deleteAccount);
router.put("/update-profile", authController.updateProfile);


module.exports = router;