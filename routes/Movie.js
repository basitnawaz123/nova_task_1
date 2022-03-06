var express = require("express");
var router = express.Router();
const {
  getMovies,
  addMovie,
  single,
  getMovieByGenre,
  deleteMovie,
  updateMovie,
  calculateBusinessByActor,
} = require("../controllers/movieController");
const { requireAuth } = require("../middleware/checkAuth");

router.get("/", getMovies);
router.post("/add", requireAuth, addMovie);
router.get("/single", requireAuth, single);
router.get("/getBygenre", getMovieByGenre);
router.get("/calculate", requireAuth, calculateBusinessByActor);
router.put("/update", requireAuth, updateMovie);
router.delete("/delete", requireAuth, deleteMovie);

module.exports = router;
