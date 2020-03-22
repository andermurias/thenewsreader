import express from "express";
import feedReader from "./api/feedRead";
import scrapReader from "./api/scrapReader";
import cors from "cors";

var app = express();

app.use(
  cors({
    origin: new RegExp("^https?://localhost(:[0-9]+)?$"),
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.static("build"));

app.use("/api", feedReader);
app.use("/api", scrapReader);
app.get(/^(?!\/(api|static).*$).*?/, (req, res) => res.sendFile("index.html"));

const port = process.env.PORT || 3001;

app.listen(port, function() {
  console.log("The News Reader - Launcher on " + port);
  process.send && process.send("ready");
});
