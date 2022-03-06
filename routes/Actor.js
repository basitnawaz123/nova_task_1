var express = require("express");
var router = express.Router();
const {
  addActor,
  listActors,
  getSpecificActor,
  updateActor,
} = require("../controllers/actorController");

const { requireAuth } = require("../middleware/checkAuth");
router.get("/", listActors);
router.post("/add", requireAuth, addActor);
router.get("/single", requireAuth, getSpecificActor);
router.put("/update", requireAuth, updateActor);

module.exports = router;
