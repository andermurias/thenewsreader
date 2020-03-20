import express from "express";
import Parser from "rss-parser";

import sources from "../../src/sources.json";
import axios from "axios";
import {Iconv} from "iconv";
import {AllHtmlEntities} from "html-entities";

const router = express.Router();

const parser = new Parser();

const truncate = (str, words) => {
  return str
    .split(" ")
    .splice(0, words)
    .join(" ");
};

const toUTF8 = text => {
  var iconv = new Iconv("ISO-8859-1", "UTF-8");
  return iconv.convert(text).toString();
};

const stripTags = text => text.replace(/(<([^>]+)>)/gi, "");

const entities = new AllHtmlEntities();
router.get("/feed-reader", async (req, res) => {
  const source = req.query.source;

  if (sources.hasOwnProperty(source)) {
    const rss = sources[source].rss;

    const rssContent = await axios.get(rss, {responseType: "arraybuffer"});
    const cleanedRss = entities.decode(
      rssContent.data.toString(sources[source].encode || "utf-8").replace("\ufeff", "")
    );
    const feed = await parser.parseString(cleanedRss);
    let processedFeed = feed.items.map(item => {
      return {
        ...item,
        content: truncate(stripTags(item.content), 40) + "...",
      };
    });
    res.send(processedFeed);
  } else {
    res.send([]);
  }
});

export default router;
