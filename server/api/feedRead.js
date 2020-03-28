import express from "express";
import Parser from "rss-parser";

import sources from "../../src/sources.json";
import axios from "axios";

const router = express.Router();

const parser = new Parser();

const truncate = (str, words) => {
  return str
    .split(" ")
    .splice(0, words)
    .join(" ");
};

const cleanXml = (xml, url) => {
  let processedXML = xml.replace("\ufeff", "");
  processedXML = processedXML.replace(">/", ">" + url + "/");
  return processedXML;
};

const getExcertp = content => truncate(stripTags(content), 35) + "...";

const getFeed = async source => {
  const selctedSource = sources[source];

  let feed = {items: []};
  const rssRequest = await axios.get(selctedSource.rss, {
    responseType: "document",
    responseEncoding: selctedSource.encode || "utf-8",
  });

  try {
    feed = await parser.parseString(cleanXml(rssRequest.data));
  } catch (e) {
    console.log(e);
  }

  return feed;
};

const stripTags = text => text.replace(/(<([^>]+)>)/gi, "");

router.get("/feed-reader", async (req, res) => {
  const source = req.query.source;

  if (!sources.hasOwnProperty(source)) {
    res.send([]);
  }

  const feed = await getFeed(source);

  let processedFeed = feed.items.map(item => {
    return {
      ...item,
      content: getExcertp(item.content),
    };
  });
  res.send(processedFeed);
});

export default router;
