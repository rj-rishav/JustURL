const express = require("express");
const { createUrl, getUrls } = require("../controllers/urlController");

const app = express();

const router = express.Router();
app.use(express.urlencoded({ extended: false }));

router.post("/", createUrl).get("/", getUrls);

module.exports = router;
