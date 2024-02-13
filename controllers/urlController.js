const { nanoid } = require("nanoid");
const User = require("../models/shortUrl");

async function createUrl(req, res, next) {
  try {
    const originalUrl = req.body.url;
    if (!originalUrl) {
      throw new Error("Empty Field");
    }
    const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    const isValidUrl = urlRegex.test(originalUrl);
    if(!isValidUrl) {
      throw new Error("Invalid URL");
    }
    const shortid = nanoid(8);
    User.create({ originalUrl: originalUrl, shortUrl: shortid, clicks: 0 })
      .then(() => {
        console.log("\nCreated successfully...");
        res.status(201).json({ url: `localhost:${process.env.PORT}/${shortid}` });
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

async function redirectUrl(req, res, next) {
  try {
    const shortid = req.params.shortid;
    const data = await User.findOne({ shortUrl: shortid });
    if (!data) {
      throw new Error("Invalid URL");
    }
    data.clicks++;
    data.save();
    res.redirect(data.originalUrl);
  } catch (error) {
    next(error);
  }
}

async function deleteEntry(req, res, next) {
  try {
    const shortid = req.params.shortid;
    await User.findOneAndDelete({ shortUrl: shortid });
    res.json({ message: "Entry deleted" });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createUrl,
  getUrls,
  redirectUrl,
  deleteEntry,
};
