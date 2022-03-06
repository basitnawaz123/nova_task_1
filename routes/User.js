var express = require("express");
var router = express.Router();
const { RegisterUser } = require("../controllers/UsersController");

/* GET users listing. */
router.post("/", RegisterUser);

module.exports = router;
