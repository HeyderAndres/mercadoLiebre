const path = require("path");
const fs = require("fs");

productsModel = {
  file: path.resolve(__dirname, "../database/products.json"),

  getProducts: function () {
    let products = JSON.parse(fs.readFileSync(this.file));
    return products;
  },

  getOneProduct: function (id) {
    let product = this.getProducts().find((product) => product.id == id);
    return product;
  },

  getProductsByName: function (text) {
    let productsName = this.getProducts().filter((product) => {
      if (product.name.toLowerCase().includes(text))
      return product;
    });
    return productsName;
  },

  createProduct: function (product) {
    let newId;
    let productsInDb = this.getProducts();
    let productIdInDb = productsInDb.map((product) => product.id);
    if (productIdInDb.length > 0) {
      let lastId = Math.max(...productIdInDb);
      newId = lastId + 1;
    } else {
      newId = 1;
    }

    product = {
      id: newId,
      ...product,
    };
    productsInDb.push(product);
    let newProductsJson = JSON.stringify(productsInDb, null, " ");
    fs.writeFileSync(this.file, newProductsJson, { encoding: "utf8" });
    return product;
  },

  editProduct: function (id, data) {
    let products = this.getProducts();
    let indexToEdit = products.findIndex((index) => index.id == id);
    products[indexToEdit] = { id: id, ...data };
    let editProductsJson = JSON.stringify(products, null, " ");
    fs.writeFileSync(this.file, editProductsJson, { encoding: "utf8" });
    return true;
  },

  deleteUser: function (id) {
    let products = this.getProducts();
    let newProductsDb = products.filter((product) => product.id != id);
    let productsJson = JSON.stringify(newProductsDb, null, " ");
    fs.writeFileSync(this.file, productsJson, { encoding: "utf8" });
    return true;
  },

  deleteImage: function (id) {
    let product = this.getOneProduct(id);
    if (product.image != "default.png") {
      let routeImage = path.resolve(
        __dirname,
        `../../public/images/products/${product.image}`
      );
      fs.existsSync(routeImage) ? fs.unlinkSync(routeImage) : "";
      return true;
    }
  },

  deleteImageByName: function (name) {
    path.resolve(__dirname, `../../public/images/products/${name}`);
    fs.existsSync(name) ? fs.unlinkSync(name) : "";
    return true;
  },
};


module.exports = productsModel;
