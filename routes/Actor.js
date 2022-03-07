var express = require("express");
var router = express.Router();
const multer = require("multer");
const {
  addActor,
  listActors,
  getSpecificActor,
  updateActor,
  importActors,
} = require("../controllers/actorController");

// multer

// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/actors");
  },
  filename: function (req, file, cb) {
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    cb(null, "actor_" + "-" + Date.now() + "." + extension);
  },
});

var upload = multer({ storage: storage });

const { requireAuth } = require("../middleware/checkAuth");
router.get("/import", requireAuth, importActors);
router.get("/", listActors);
router.post("/", upload.single("picture"), requireAuth, addActor);
router.get("/:id", requireAuth, getSpecificActor);
router.put("/:id", requireAuth, updateActor);


module.exports = router;
