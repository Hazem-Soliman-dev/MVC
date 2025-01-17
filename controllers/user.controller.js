const userModel = require("../models/user.model");
const hashing = require("../utili/hashing");
const auth = require("../utili/auth");

exports.createUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name) name = "unknown";
  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "Email already exists" });
    }
    const hashedPassword = await hashing.hashPassword(password);
    const newUser = await userModel.create({
      ...req.body,
      password: hashedPassword,
    });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email }).populate("userType");
    if (!user) {
      return res.status(400).json({ error: "this email not found" });
    }
    if (!(await hashing.isMatch(password, user.password))) {
      return res.status(400).json({ error: "this password not match" });
    }
    const token = auth.createAccessToken({
      userId: user._id,
      userName: user.name,
      userType: user.userType.name,
    });
    res.status(200).json({ accessToken: token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await userModel.find().populate("userType");
    if (!users) return res.status(404).json({ error: "Users not found" });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
