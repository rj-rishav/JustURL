const express = require("express");

const app = express();

async function createUrl(req, res) {
  const originalUrl = req.body.url;
  if (!originalUrl) {
    return res.status(406).json({ message: "URL is required" });
  }
  console.log(originalUrl);
  fetch(originalUrl).catch(() => {
    res.json({ message: "Provided URL is either incorrect or not working." });
  });
  res.status(200).json({ message: "Success" });
}

module.exports = {
  createUrl,
};
