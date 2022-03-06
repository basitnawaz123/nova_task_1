const MoviesModel = require("../models/Movies");



const getMovies = async (req, res) => {
  const result = await MoviesModel.find().populate({
    path: "actors",
    select: "name age gender",
  });
  if (result) {
    res.json(result);
  } else {
    res.send("No movies found!");
  }
};

// Add New Movie
const addMovie = async (req, res) => {
  const { name, genre, businessDone, actors, reviews, rating } = req.body;

  const movieData = new MoviesModel({
    name,
    genre,
    actors,
    reviews,
    rating,
    businessDone,
  });

  try {
    await movieData.save();
    res.send("Movie added successfully!");
  } catch (error) {
    res.send(error.message);
  }
};

// Fetching Single Movie Record
const single = async (req, res) => {
  const _id = req.query.id;
  const result = await MoviesModel.findById({ _id }).populate({
    path: "actors",
    select: "name age gender",
  });
  if (result) {
    res.json(result);
  } else {
    res.send("Record not found!");
  }
};

// Fetching single movie by Genre
const getMovieByGenre = async (req, res) => {
  const genre = req.query.genre;
  try {
    const result = await MoviesModel.find({ genre });
    if (result) {
      res.status(200).json(result);
    } else {
      res.send("No record found!");
    }
  } catch (error) {
    res.send(error.message);
  }
};

// Deleting movie record
const deleteMovie = async (req, res) => {
  const _id = req.query.id;

  try {
    await MoviesModel.findByIdAndDelete({ _id });

    res.send("Record deleted successfully");
  } catch (error) {
    res.send(error.message);
  }
};

// Calculating movie Business amount by actor
const calculateBusinessByActor = async (req, res) => {
  _id = req.query.id;
  try {
    const sum = await MoviesModel.aggregate([
      { $match: {} },
      {
        $group: {
          _id: "$actors._id",
          total: {
            $sum: "$businessDone",
          },
        },
      },
    ]);
    res.json(sum);
  } catch (error) {
    res.send(error.message);
  }
};

// Updating Movie

const updateMovie = async (req, res) => {
  _id = req.query.id;
  const { reviews } = req.body;

  try {
    await MoviesModel.findOneAndUpdate(
      { _id },
      {
        $push: {
          reviews,
        },
      }
    );
    res.status(200).send("Movie Updated Successfully!");
  } catch (error) {
    res.send(error.message);
  }
};

module.exports = {
  addMovie,
  getMovies,
  single,
  getMovieByGenre,
  deleteMovie,
  updateMovie,
  calculateBusinessByActor,
};
