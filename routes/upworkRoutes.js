const express = require("express");
const upworkController = require("../controllers/upworkApi");
const router = express.Router();

router.post("/get_token", upworkController.get_token);
router.post("/get_jobs", upworkController.get_jobs);

module.exports = router;
