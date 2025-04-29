const Product = require("../models/Product");
const Cart = require("../models/cart");
const { STATUS_CODE } = require("../constants/statusCode");

exports.addProductToCart = (request, response) => {
  const newProduct = Product.add(request.body);

  if (newProduct && newProduct.name) {
    Cart.add(newProduct.name);
  } else {
     console.error("Failed to add product or product name is missing.");
  }

  response.status(STATUS_CODE.FOUND).redirect("/products/new");
};

exports.getProductsCount = (request, response) => {
  const count = Cart.getProductsQuantity();
  response.status(STATUS_CODE.OK).json({ cartCount: count });
};

exports.getCartItems = (request, response) => {
    const items = Cart.getItems();
    const total = Cart.getTotalPrice();
    response.status(STATUS_CODE.OK).json({ items, total });
};