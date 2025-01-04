const catygoryModel = require("../models/catygory.model");

exports.createCategory = async (req, res) => {
  try {
    const category = await catygoryModel.create(req.body);
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await catygoryModel.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const category = await catygoryModel.findById(req.params.id);
    if (!category) return res.status(404).json({ error: "Category not found" });
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const category = await catygoryModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!category) return res.status(404).json({ error: "Category not found" });
    res.status(200).json(category);
  } catch (err) {
    res.status(404).json({ error: "Category not found" });
  }
};

exports.changeStatus = async (req, res) => {
  try {
    const category = await catygoryModel.findById(req.params.id);
    if (!category) return res.status(404).json({ error: "Category not found" });
    category.status == "active"
    ? (category.status = "unactive")
    : (category.status = "active");
    await category.save();
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await catygoryModel.findById(req.params.id);
    if (!category) return res.status(404).json({ error: "Category not found" });
    category.status = "deleted";
    await category.save();
    res.status(204).json("deleted category successfully");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
