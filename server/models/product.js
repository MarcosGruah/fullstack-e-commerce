const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: String,
  category: String,
  price: String,
  description: String,
  rating: String,
  imageUrl: String,
});

module.exports = mongoose.model("Product", ProductSchema);
