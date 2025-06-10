const userModel = require("../models/userModel")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator")

const registerUser = async (req, res) => {
    try {
        const isExisting = await userModel.findOne({ email: req.body.email });

        if (isExisting) {
          throw new Error("Email is already taken by another user!");
        }

        /*console.log(req.body.username)
        console.log(req.body.email)
        console.log(req.body.password)*/
      
        if (!req.body.username || !req.body.email || !req.body.password) {
          throw new Error("All fields are required!");
        }

        if (!validator.isEmail(req.body.email)) {
          throw new Error("Email must be a valid email!");
        }

        if (!validator.isStrongPassword(req.body.password)) {
          throw new Error("Password must be a strong password!");
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = await userModel.create({
          ...req.body,
          password: hashedPassword,
        });

        const { password, ...others } = newUser._doc;
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
          expiresIn: "8d",
        });

        return res.status(201).json({ others, token });
      } catch (error) {
        return res.status(500).json(error.message);
      }
}

const loginUser = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    /*console.log(req.body.email)
    console.log(req.body.password)*/
    if (!user) {
      throw new Error("Wrong credentials. Try again!");
    }

    const comparePass = await bcrypt.compare(req.body.password, user.password);
    if (!comparePass) {
      throw new Error("Wrong credentials. Try again!");
    }

    const { password, ...others } = user._doc;
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "8d",
    });

    return res.status(200).json({ others, token });
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

const findUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id).select("-password");
    if (!user) throw new Error("No such user");
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

const getUsers = async (req,res) => {
  try {
    const users = await userModel.find({})

    const formattedUsers = users.map((user) => {
        return {username: user.username, email: user.email, _id: user._id, createdAt: user.createdAt}
    })

    return res.status(200).json(formattedUsers)
} catch (error) {
    return res.status(500).json(error.message) 
}
}

module.exports = {registerUser,loginUser,findUser,getUsers};
