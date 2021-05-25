const express = require("express");
const app = express();
app.get("/", (req, res) => {
  res.send("Request Received");
});

app.listen(3000, () => {
  console.log("Server Connected");
});
