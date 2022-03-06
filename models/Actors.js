const mongoose = require("mongoose");

const ActorSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    age: {
      type: Number,
      required: true,
    },

    gender: {
      type: String,
      enum: ["male", "female"],
    },

    reviews: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = actors = mongoose.model("actors", ActorSchema);
