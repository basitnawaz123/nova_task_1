const actorModel = require("../models/Actors");

const addActor = async (req, res) => {
  const { name, age, gender, createdBy } = req.body;
  const actors = new actorModel({
    name,
    age,
    gender,
    createdBy,
  });

  try {
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
  const _id = req.query.id;
  const result = await actorModel.findById({ _id });
  res.json(result);
};

const updateActor = async (req, res) => {
  const _id = req.query.id;

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
    listActors;
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  addActor,
  listActors,
  getSpecificActor,
  updateActor,
};
