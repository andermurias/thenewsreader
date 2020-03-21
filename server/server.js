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
app.get("/", (req, res) => res.sendFile("index.html"));

app.listen(3001, function() {
  console.log("Example app listening on port 3001!");
  process.send && process.send("ready");
});
