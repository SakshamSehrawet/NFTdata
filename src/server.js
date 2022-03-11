require("dotenv").config();
const express = require('express');
 const { doStuff } = require('./app.js')
const PORT = process.env.NODE_DOCKER_PORT || 8080;
const app = express();
app.listen(PORT, () => {
  doStuff();
});