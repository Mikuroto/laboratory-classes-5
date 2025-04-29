const Product = require("../models/Product");
const Cart = require("../models/cart");
const { MENU_LINKS } = require("../constants/navigation");
const { STATUS_CODE } = require("../constants/statusCode");

exports.getProductsView = (request, response) => {
  const products = Product.getAll();
  const cartCount = Cart.getProductsQuantity();

  response.render("products.ejs", {
    headTitle: "Shop - Products",
    path: "/products",
    menuLinks: MENU_LINKS,
    activeLinkPath: "/products",
    products,
    cartCount,
  });
};

exports.getAddProductView = (request, response) => {
  const cartCount = Cart.getProductsQuantity();

  response.render("add-product.ejs", {
    headTitle: "Shop - Add product",
    path: "/products/add",
    menuLinks: MENU_LINKS,
    activeLinkPath: "/products/add",
    cartCount,
  });
};

exports.getNewProductView = (request, response) => {
  const newestProduct = Product.getLast();
  const cartCount = Cart.getProductsQuantity();

  response.render("new-product.ejs", {
    headTitle: "Shop - New product",
    path: "/products/new",
    activeLinkPath: "/products/new",
    menuLinks: MENU_LINKS,
    newestProduct,
    cartCount,
  });
};

exports.getProductView = (request, response) => {
  const name = request.params.name;
  const product = Product.findByName(name);
  const cartCount = Cart.getProductsQuantity();

  if (!product) {
     return response.status(STATUS_CODE.NOT_FOUND).render("404", {
        headTitle: "404 - Product Not Found",
        menuLinks: MENU_LINKS,
        activeLinkPath: "",
        cartCount: Cart.getProductsQuantity(),
     });
  }

  response.render("product.ejs", {
    headTitle: `Shop - ${product.name}`,
    path: `/products/${name}`,
    activeLinkPath: "/products",
    menuLinks: MENU_LINKS,
    product,
    cartCount,
  });
};

exports.deleteProduct = (request, response) => {
  const name = request.params.name;
  Product.deleteByName(name);

  response.status(STATUS_CODE.OK).json({ success: true });
};