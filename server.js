//Dependencies needed//
const express = require("express");
const path = require("path");

//Server setup//
const PORT = process.env.PORT || 3001;
const app = express();
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//To use middleware//
app.use(express.static("public"));

// Use apiRoutes
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

//get the server to listen//
app.listen(3001, () => {
  console.log(`API server now on port ${PORT}!`);
});
