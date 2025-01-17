const productModel = require("../models/product.model");
exports.getProducts = async (req, res) => {
  try {
    const products = await productModel
      .find({ status: "active" })
      .populate("category");
    if (!products.length)
      return res.status(404).json({ error: "Products not found" });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await productModel
      .findById(req.params.id, { status: "active" })
      .populate("category");
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const product = await productModel.create({
      ...req.body,
      imgeURL: req.file.filename,
    });
    if (!product) return res.status(404).json({ error: "Product not created" });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await productModel.findByIdAndUpdate(
      req.params.id,
      { ...req.body, imgeURL: req.file.filename },
      { new: true }
    );
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.changeStatus = async (req, res) => {
  try {
    const product = await productModel.findByIdAndUpdate(
      req.params.id,
      { status: product.status === "active" ? "unactive" : "active" },
      { new: true }
    );
    if (!product) return res.status(404).json("Product not found");
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.deleteProduct = async (req, res) => {
  try {
    const result = await productModel.findByIdAndUpdate(
      req.params.id,
      { status: "deleted" },
      { new: true }
    );
    if (!result) return res.status(404).json("Product not found");

    res.status(204).json("Product deleted successfully");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
