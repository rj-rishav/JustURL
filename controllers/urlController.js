const express = require("express");
const { nanoid } = require("nanoid");
const User = require("../models/shortUrl");

const app = express();

async function checkurl(url, next) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Invalid Url");
    }
    return true;
  } catch (error) {
    next(error);
    return false;
  }
}

async function createUrl(req, res, next) {
  try {
    const originalUrl = req.body.url;
    if (!originalUrl) {
      throw new Error("Empty Field");
    }
    let checkResult = checkurl(originalUrl, next);
    if (!checkResult) {
      throw new Error("Invalid url");
    }
    const shortid = nanoid(8);
    User.create({ originalUrl: originalUrl, shortUrl: shortid, clicks: 0 })
      .then(() => {
        console.log("\nCreated successfully...");
        res.status(201).json({ url: `localhost:3001/${shortid}` });
      })
      .catch((error) => {
        next(error);
      });
  } catch (error) {
    next(error);
  }
}

async function getUrls(req, res) {
  try {
    const data = await User.find({});
    res.json(data);
  } catch (error) {
    console.log(`\nError: ${error}`);
    res.status(500).json({ error: `${error}` });
  }
}

//TODO: creating the function to handle redirection
async function redirectUrl(req, res, next) {
  try {
    const shortid = req.params.shortid;
    const data = await User.findOne({ shortUrl: shortid });
    res.redirect(data.originalUrl);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createUrl,
  getUrls,
  redirectUrl,
};
