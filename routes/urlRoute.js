const express = require("express");
const {
  createUrl,
  getUrls,
  redirectUrl,
  deleteEntry,
} = require("../controllers/urlController");

const app = express();

const router = express.Router();
app.use(express.urlencoded({ extended: false }));

router
  .post("/urls", createUrl)
  .get("/urls", getUrls)
  .get("/:shortid", redirectUrl)
  .delete("/urls/:shortid", deleteEntry);

module.exports = router;
