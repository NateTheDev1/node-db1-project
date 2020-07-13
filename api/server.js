const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

const AccountRoutes = require("./AccountRouter.js");
server.use("/api/accounts", AccountRoutes);

module.exports = server;
