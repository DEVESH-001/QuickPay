// backend/routes/index.js
const express = require("express");
const userRouter = require("./user");

const router = express.Router();

// Register the user routes
router.use("/user", userRouter);

module.exports = router;
