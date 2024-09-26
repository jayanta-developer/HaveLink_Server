const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const express = require("express");
const App = express();
App.use(express.json());
App.use(express.urlencoded({ extended: true }));

//Routers
const Admin = require("./Router");

//Router Mounting
App.use("/api/", Admin);

module.exports = App;
