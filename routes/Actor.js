var express = require("express");
var router = express.Router();
const {
  addActor,
  listActors,
  getSpecificActor,
  updateActor,
  importActors,
} = require("../controllers/actorController");

const { requireAuth } = require("../middleware/checkAuth");
router.get("/import", requireAuth, importActors);
router.get("/", listActors);
router.post("/", requireAuth, addActor);
router.get("/:id", requireAuth, getSpecificActor);
router.put("/:id", requireAuth, updateActor);


module.exports = router;
