const mongoose = require("mongoose");

const connectDB = async () => {
  return mongoose
    .connect(process.env.MONOGO_LOCAL_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Mongo DB Connected!"))
    .catch((error) => console.log(error));
};
module.exports = connectDB;
