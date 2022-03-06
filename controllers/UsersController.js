const bcrypt = require("bcryptjs");
const UsersModel = require("../models/Users");
var jwt = require("jsonwebtoken");

const RegisterUser = async (req, res) => {
  const regData = new UsersModel({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    password: bcrypt.hashSync(req.body.password, 5),
  });

  try {
    await regData.save();
    res.status(200).send("User registered successfully!");
  } catch (error) {
    res.send(error.message);
  }
};

const Auth = async (req, res) => {
  const { email, password } = req.body;
  const userData = await UsersModel.findOne({ email });
  if (!userData) {
    res.send("Record not found!");
  } else {
    bcrypt.compare(password, userData.password, (err, result) => {
      if (result) {
        var token = jwt.sign({ _id: userData._id }, "NovaIntern");

        res.status(200).json({ token });
      } else {
        res.send("Password is incorrect");
      }
    });
  }
};

module.exports = {
  RegisterUser,
  Auth,
};
