const express = require("express");
const {
  createUrl,
  getUrls,
  redirectUrl,
  deleteEntry,
} = require("../controllers/urlController");

const router = express.Router();

router
  .post("/urls", createUrl)
  .get("/urls", getUrls)
  .get("/:shortid", redirectUrl)
  .delete("/urls/:shortid", deleteEntry);

module.exports = router;
