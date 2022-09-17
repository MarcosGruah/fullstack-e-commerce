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

  for (let i = 0; i < 20; i++) {
    const product = new Product({
      name: "Camiseta Stranger Things Hellfire Club",
      category: "Roupas Masculinas",
      price: `${randomNumber(25, 300)}`,
      description: "Camiseta com impressão digital",
      brand: "Jordan",
      rating: `${randomNumber(0, 5)}`,
      numReviews: `${randomNumber(0, 200)}`,
      imageUrl:
        "https://images-americanas.b2w.io/produtos/5527602868/imagens/camiseta-stranger-thinks-hellfire-club-100-algodao/5527602884_1_large.jpg",
    });
    await product.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
