class Product {
  constructor(name, description, price) {
    this.name = name;
    this.description = description;
    this.price = parseFloat(price) || 0;
  }

  static #products = [];

  static getAll() {
    return this.#products;
  }

  static add(productData) {
    const newProduct = new Product(productData.name, productData.description, productData.price);
    this.#products.push(newProduct);
    return newProduct;
  }

  static findByName(name) {
    return this.#products.find((product) => product.name === name);
  }

  static deleteByName(name) {
    this.#products = this.#products.filter((product) => product.name !== name);
  }

  static getLast() {
    if (!this.#products.length) {
      return;
    }
    return this.#products[this.#products.length - 1];
  }
}

module.exports = Product;