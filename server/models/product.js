const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: String,
  category: String,
  price: Number,
  description: String,
  brand: String,
  rating: Number,
  numReviews: Number,
  imageUrl: String,
});

module.exports = mongoose.model("Product", ProductSchema);
