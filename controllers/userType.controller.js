const userTypeModel = require("../models/userType.model");

exports.createUserType = async (req, res) => {
  try {
      const userType = await userTypeModel.create(req.body);
      res.status(201).json(userType);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserTypes = async (req, res) => {
  try {
    const userTypes = await userTypeModel.find();
    res.status(200).json(userTypes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
