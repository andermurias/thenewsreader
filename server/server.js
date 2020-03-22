import express from "express";
import feedReader from "./api/feedRead";
import scrapReader from "./api/scrapReader";
import cors from "cors";

var app = express();

app.use(express.static("build"));

app.use(
  cors({
    origin: new RegExp("^https?://localhost(:[0-9]+)?$"),
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api", feedReader);
app.use("/api", scrapReader);
app.get("*", (req, res) => res.sendFile("index.html", {root: __dirname + "/../build"}));

const port = process.env.PORT || 3001;

app.listen(port, function() {
  console.log("The News Reader - Launcher on " + port);
  process.send && process.send("ready");
});
