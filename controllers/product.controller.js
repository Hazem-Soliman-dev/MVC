const productModel = require("../models/product.model");

exports.createProduct = async (req, res) => {
  try {
    const product = await productModel.create({
      ...req.body,
      imgeURL: req.file.filename,
    });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
