const mongoose = require("mongoose");
const Product = require("../models/product");

mongoose.connect("mongodb://localhost:27017/myEcommerce");

mongoose.connection.on("error", console.error.bind(console, "Connection Error:"));
mongoose.connection.once("open", () => {
  console.log("Database Connected");
});

function randomNumber(minNum, maxNum) {
  const randomNumber = Math.floor(Math.random() * maxNum + minNum);
  return randomNumber;
}

const seedDB = async () => {
  await Product.deleteMany({});

  for (let i = 0; i < 50; i++) {
    const categories = ["feminino", "masculino", "infantil"];
    const product = new Product({
      name: `Produto ${i + 1}`,
      category: categories[randomNumber(0, categories.length)],
      price: `${randomNumber(25, 300)}`,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      rating: `${randomNumber(0, 5)}`,
      imageUrl:
        "https://images-americanas.b2w.io/produtos/5527602868/imagens/camiseta-stranger-thinks-hellfire-club-100-algodao/5527602884_1_large.jpg",
    });
    await product.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
