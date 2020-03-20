import express from "express";
import Parser from "rss-parser";
import axios from "axios";
import cheerio from "cheerio";

import sources from "../../src/sources.json";

const router = express.Router();

router.get("/scrap-url", async (req, res, next) => {
  let data = {
    url: req.query.url,
    img: "",
    content: "",
  };

  if (!sources.hasOwnProperty(req.query.source)) {
    res.send(data);
    next();
  }

  const source = sources[req.query.source];

  const response = await axios.get(req.query.url, {responseType: "arraybuffer"});
  if (response.status !== 200) {
    res.send("Error fetching page");
  }

  // res.send(data);
  const document = cheerio.load(response.data.toString(source.encode || "utf-8"));

  const scrapContent = document(source.scraping.content);
  if (scrapContent.length) {
    data.content = document(scrapContent[0]).html();
  }

  const scrapImage = document(source.scraping.image);
  if (scrapImage.length) {
    data.img = document(scrapImage[0]).attr("src");
  }

  const scrapTitle = document(source.scraping.title);
  if (scrapTitle.length) {
    data.title = document(scrapTitle[0]).text();
  }

  res.send(data);
});

export default router;
