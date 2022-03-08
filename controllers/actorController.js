const request = require("request");
const actorModel = require("../models/Actors");
const path = require("path");
const fs = require("fs");
const multer = require("multer");

const importActors = (req, res) => {
  try {
    const limit = 50;
    request(
      {
        url: `https://dummyapi.io/data/v1/user?limit=${limit}`,
        json: true,
        headers: {
          "app-id": "6224f44f6d73189f1307c1ed",
        },
      },
      async (error, response, body) => {
        if (error) throw error.message;
        const data = body.data;
        var download = function (uri, filename) {
          request.head(uri, function (err, res, body) {
            request(uri).pipe(
              fs.createWriteStream(
                path.join(__dirname, "../uploads/actors", filename)
              )
            );
          });
        };

        for (let index = 0; index < data.length; index++) {
          const element = data[index];
          download(element.picture, `actor_${path.basename(element.picture)}`);
          const actorsData = new actorModel({
            name: element.firstName + element.lastName,
            gender:
              element.title == "ms" || element.title == "miss"
                ? "female"
                : "male",
            age: Math.floor(Math.random() * 70) + 25,
            picture: `${
              process.env.BASE_URL
            }/uploads/actors/actor_${path.basename(element.picture)}`,
          });

          await actorsData.save();
        }

        res.status(200).json({ message: "Record insert successfully" });
      }
    );
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const addActor = async (req, res) => {
  try {
    const filename = req.file;
    let extArray = filename.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    let picture =
      process.env.BASE_URL +
      "/uploads/actors/" +
      "actor_" +
      Date.now() +
      "." +
      extension;
    const { name, age, gender } = req.body;
    const actors = new actorModel({
      name,
      age,
      gender,
      picture,
    });
    await actors.save();
    res.status(200).send("Actor created successfully!");
  } catch (error) {
    res.send(error.message);
  }
};

const listActors = async (req, res) => {
  const result = await actorModel.find({});
  if (result.length > 0) {
    res.json(result);
  } else {
    res.send("No record found!");
  }
};

const getSpecificActor = async (req, res) => {
  const _id = req.params.id;
  const result = await actorModel.findById({ _id });
  res.json(result);
};

const updateActor = async (req, res) => {
  const _id = req.params.id;

  const { name, age, gender } = req.body;
  try {
    await actorModel.findOneAndUpdate(
      { _id },
      {
        $set: {
          name,
          age,
          gender,
        },
      }
    );
    res.status(200).send("Actor updated successfully!");
  } catch (error) {
    res.send(error.message);
  }
};

module.exports = {
  addActor,
  listActors,
  getSpecificActor,
  updateActor,
  importActors,
};
