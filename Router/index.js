const express = require("express");
const router = express.Router();
const Admin = require("../Controller");

//Admin
router.post("/admin/login", Admin.LogInAdmin);

module.exports = router;
