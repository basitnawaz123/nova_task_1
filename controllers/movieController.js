const MoviesModel = require("../models/Movies");
const json2csv = require("json2csv").parse;
const fs = require("fs");
const path = require("path");

const getMovies = async (req, res) => {
  try {
    const result = await MoviesModel.find({}).populate({
      path: "actors._id",
      select: "name age gender",
    });

    if (result) {
      res.json(result);
    } else {
      res.send("No movies found!");
    }
  } catch (error) {
    res.send(error.message);
  }
};

// Add New Movie
const addMovie = async (req, res) => {
  const filename = req.file;
  let extArray = filename.mimetype.split("/");
  let extension = extArray[extArray.length - 1];
  let poster =
    process.env.BASE_URL +
    "/uploads/movie_posters/" +
    "poster_" +
    Date.now() +
    "." +
    extension;
  const { name, genre, businessDone, actors, reviews, rating } = req.body;

  const movieData = new MoviesModel({
    name,
    genre,
    actors,
    reviews,
    rating,
    businessDone,
    poster,
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
  const _id = req.params.id;
  const result = await MoviesModel.findById({ _id }).populate({
    path: "actors._id",
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
  const genre = req.params.genre;
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
  const _id = req.params.id;

  try {
    await MoviesModel.findByIdAndDelete({ _id });

    res.send("Record deleted successfully");
  } catch (error) {
    res.send(error.message);
  }
};

// Calculating movie Business amount by actor
const calculateBusinessByActor = async (req, res) => {
  _id = req.params.id;
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
  _id = req.params.id;

  const filename = req.file;
  let extArray = filename.mimetype.split("/");
  let extension = extArray[extArray.length - 1];
  let poster =
    process.env.BASE_URL +
    "/uploads/movie_posters/" +
    "poster_" +
    Date.now() +
    "." +
    extension;

  const { reviews } = req.body;

  try {
    await MoviesModel.findOneAndUpdate(
      { _id },
      {
        $push: {
          reviews,
          poster,
        },
      }
    );
    res.status(200).send("Movie Updated Successfully!");
  } catch (error) {
    res.send(error.message);
  }
};

const generateCsv = async (req, res) => {
  const data = await MoviesModel.find().populate({
    path: "actors._id",
    select: "name age gender",
  });

  const fields = ["_id", "name", "genre", "actors", "businessDone"];
  var filePath = "./uploads/exports/" + Date.now() + ".csv";

  try {
    csv = json2csv(data, { fields });
    fs.writeFile(filePath, csv, function (err) {
      if (err) {
        res.send(err.message);
      } else {
        console.log("CSV generated");
        res.setHeader("Content-disposition", "attachment; filename=data.csv");
        res.set("Content-Type", "text/csv");
        res.status(200).send(csv);
      }
    });

    res.download(filePath, "GeneratedCsV.csv");
  } catch (err) {
    res.status(500).json({ err: err.message });
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
  generateCsv,
};
