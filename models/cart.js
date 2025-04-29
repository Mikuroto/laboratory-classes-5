const Product = require("./Product");

class Cart {
  static #items = [];

  static add(productName) {
    const product = Product.findByName(productName);

    if (!product) {
      console.error(`Error: Product with name "${productName}" not found.`);
      return;
    }

    const existingCartItemIndex = this.#items.findIndex(
      (item) => item.product.name === productName
    );

    if (existingCartItemIndex >= 0) {
      this.#items[existingCartItemIndex].quantity += 1;
    } else {
      this.#items.push({ product: product, quantity: 1 });
    }
  }

  static getItems() {
    return this.#items;
  }

  static getTotalPrice() {
    return this.#items.reduce((total, item) => {
      const price = Number(item.product.price) || 0;
      return total + price * item.quantity;
    }, 0);
  }

  static getProductsQuantity() {
    return this.#items.reduce((total, item) => total + item.quantity, 0);
  }

  static clearCart() {
    this.#items = [];
  }
}

module.exports = Cart;