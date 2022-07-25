const express = require("express");
const keywordsController = require("../controllers/keywordsApi");
const router = express.Router();

router.get("/keywords", keywordsController.get_keywords);
router.post("/keywords", keywordsController.save_keywords);
router.post("/phrases", keywordsController.save_phrases);

module.exports = router;
