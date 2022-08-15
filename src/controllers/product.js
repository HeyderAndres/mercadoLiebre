const productsModel = require("../models/product");
const { validationResult } = require("express-validator");
const path = require("path");

let productosController = {
  allProducts: function (req, res) {
    let products = productsModel.getProducts();
    res.render("products", { products: products });
  },

  createProduct: function (req, res) {
    res.render("products/create");
  },

  searchProduct: function (req, res) {
    let text = req.query.search.toLowerCase();
    let products = productsModel.getProductsByName(text);
    res.render("products/search", { products: products });
  },

  detailProduct: function (req, res) {
    let id = req.params.id;
    let product = productsModel.getOneProduct(id);
    res.render("products/detail", { product: product });
  },

  editProduct: function (req, res) {
    let id = req.params.id;
    let product = productsModel.getOneProduct(id);
    res.render("products/edit", { product: product });
  },

  saveProduct: function (req, res) {
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      let imagen = "default.png";
      if (req.file) {
        imagen = req.file.filename;
      }
      let product = {
        ...req.body,
        image: imagen,
      };
      productsModel.createProduct(product);
      return res.redirect("/products/detail/" + product.id);
    } else {
      let imagen = req.file
        ? path.resolve(
            __dirname,
            `../../public/images/products/${req.file.filename}`
          )
        : "";
      productsModel.deleteImageByName(imagen);
      return res.render("products/create", {
        errors: errors.mapped(),
        old: req.body,
      });
    }
  },

  updateProduct: function (req, res) {
    let id = req.params.id;
    let errors = validationResult(req);
    let image = productsModel.getOneProduct(id).image;
    if (errors.isEmpty()) {
      if (req.file) {
            productsModel.deleteImage(id);
            image = req.file.filename;
          }
          let data = {
            ...req.body,
            image: image,
          };
          productsModel.editProduct(id, data);
          return res.redirect('products/detail/'+id);
    }else{
      let nameImage = req.file?req.file.filename:"";
      productsModel.deleteImageByName(nameImage);
      return res.redirect(`products/edit/${id}`, { errors: errors.mapped(), old: req.body });
    }
    
  },

  deleteProduct: function (req, res) {
    let id = req.params.id;
    productsModel.deleteImage(id);
    productsModel.deleteUser(id);
    return res.redirect("/");
  },
  listProduct: function (req, res) {
    let products = productsModel.getProducts();
    res.render("products/list", { products: products });
  }
};

module.exports = productosController;
