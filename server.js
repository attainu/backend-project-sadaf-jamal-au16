const express = require("express");
const app = express();
app.get("/", (req, res) => {
  res.send("Request Received");
});
app.get("/login", (req, res) => {
  res.json("Both of Us have created our own branches");
});

app.listen(3000, () => {
  console.log("Server Connected");
});
