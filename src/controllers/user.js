const userModel = require("../models/user");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const path = require("path");

let userController = {
  login: (req, res) => {
    res.render("users/login");
  },

  loggued: (req, res) => {
    let userToLogin = userModel.getOneUserByField("email", req.body.usuario.toLowerCase());
    if (userToLogin) {
      let passwordIsValid = bcrypt.compareSync(req.body.contrasena, userToLogin.contrasena);
      if (passwordIsValid) {
        delete userToLogin.contrasena;
        req.session.userLoggued = userToLogin;
        if (req.body.recordarme) {
          res.cookie("userLoggued", req.body.usuario.toLowerCase(), { maxAge: 1000 * 60 * 60 });
        }
        return res.redirect("/users/profile");
      }
      return res.render("users/login", {
        errors: { 
          email: { 
            msg: "Datos incorrectos" 
          } 
        }
      });
    }
    return res.render("users/login", {
      errors: { email: { msg: "Datos incorrectos" } },
    });
  },

  profile: (req, res) => {
    res.render("users/profile", {
      user: req.session.userLoggued,
    });
  },

  logout: (req, res) => {
    res.clearCookie("userLoggued");
    req.session.destroy();
    res.redirect("/");
  },

  register: (req, res) => {
    return res.render("users/register");
  },

  create: (req, res) => {
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      let image = "default.png";
      if (req.file) {
        image = req.file.filename;
      }
      delete req.body.reContrasena;
      let email = req.body.email.toLowerCase();
      let userInDb = userModel.getOneUserByField("email", req.body.email.toLowerCase());
      if (!userInDb) {
        let user = {
          ...req.body,
          email: email,
          contrasena: bcrypt.hashSync(req.body.contrasena, 10),
          image: image,
        };
        userModel.registerUser(user);
        res.redirect("/users/login");
      }else {
        return res.render("users/register", {
          errors: {
            email: {
              msg: "El email ya existe",
            },
          },
          old: req.body,
        });
      }
    } else {
      let routeImage = req.file
        ? path.resolve(
            __dirname,
            `../../public/images/users/${req.file.filename}`
          )
        : "";
      userModel.deleteAvatarByName(routeImage);
      return res.render("users/register", {
        errors: errors.mapped(),
        old: req.body,
      });
    }
  },

  edit: (req, res) => {
    let id = req.params.id;
    let user = userModel.getOneUser(id);
    return res.render("users/edit", { user: user });
  },

  update: (req, res) => {
    let id = req.params.id;
    let errors = validationResult(req);
    let image = userModel.getOneUser(id).image;
    if (errors.isEmpty()) {
      if (req.file) {
        userModel.deleteAvatar(id);
        image = req.file.filename;
      }
      delete req.body.reContrasena;
      let data = {
        ...req.body,
        image: image,
      }
      userModel.editUser(id, data);
      res.redirect("/users/profile/" + id);
    } else {
      let nameImage = req.file ? req.file.filename : "";
      userModel.deleteAvatarByName(nameImage);
      return res.render("users/edit/" + id, {
        errors: errors.mapped(),
        old: req.body,
      });
    }
  },

  detail: (req, res) => {
    let id = req.params.id;
    let user = userModel.getOneUser(id);
    return res.render("users/detail", { user });
  },

  delete: (req, res) => {
    let id = req.params.id;
    userModel.deleteAvatar(id);
    userModel.deleteUser(id);
    return res.redirect("/");
  },
};

module.exports = userController;
