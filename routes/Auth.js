const express = require("express");
var router = express.Router();
const { Auth } = require("../controllers/UsersController");

router.post("/", Auth);
module.exports = router;
