const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/techmartDB", { useNewUrlParser: true, useUnifiedTopology: true });

// Product Schema
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    category: String,
    image: String,
    description: String,
});

const Product = mongoose.model("Product", productSchema);

// Routes
app.get("/", (req, res) => {
    Product.find({}, (err, products) => {
        if (!err) {
            res.render("index", { products: products });
        }
    });
});

app.get("/product/:id", (req, res) => {
    const productId = req.params.id;
    Product.findById(productId, (err, product) => {
        if (!err) {
            res.render("product", { product: product });
        }
    });
});

app.post("/buy", (req, res) => {
    const order = req.body;
    console.log("Order Received:", order);
    res.send("Thank you! Your order has been placed.");
});

// Start Server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
