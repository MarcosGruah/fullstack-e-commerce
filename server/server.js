const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const path = require("path");
const Product = require("./models/product");
const app = express();
const port = 3000;

mongoose.connect("mongodb://localhost:27017/myEcommerce");

mongoose.connection.on("error", console.error.bind(console, "Connection Error:"));
mongoose.connection.once("open", () => {
  console.log("Database Connected");
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../web/src/views"));
app.use(express.static(path.join(__dirname, "../web/src/public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);

app.get("/", async (req, res) => {
  const products = await Product.find({}).sort({ _id: -1 }).limit(12);
  res.render("index", { products });
});

app.get("/products", async (req, res) => {
  if (req.query.q == undefined) {
    const products = await Product.find({}).sort({ _id: -1 });
    res.render("shop", { products, title: "Todos os Produtos" });
  } else {
    const query = req.query.q.toLowerCase();
    const products = await Product.find({ category: query }).sort({ _id: -1 });
    res.render("shop", { products, title: products[0].category });
  }
});

app.get("/admin", async (req, res) => {
  res.render("admin");
});

app.get("/products/new", (req, res) => {
  res.render("new");
});

app.post("/products", async (req, res) => {
  const product = new Product(req.body.product);
  await product.save();
  res.redirect(`/admin`);
});

app.get("/products/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.render("product", { product });
});

app.get("/products/:id/edit", async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.render("edit", { product });
});

app.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, { ...req.body.product });
  res.redirect(`/products/${product._id}`);
});

app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);
  res.redirect("/products");
});

app.listen(port, () => {
  `Server listening on http://localhost:${port}`;
});
