const { body } = require("express-validator");
const path = require("path");
const validation = {
    user:[
    body("nombreYApellido")
      .notEmpty()
      .withMessage("debe completar este campo nombre y apellido"),
    body("usuario")
      .notEmpty()
      .withMessage("debe completar el campo usuario")
      .bail()
      .not()
      .isNumeric()
      .withMessage("el usuario no puede ser numeros"),
    body("email")
      .notEmpty()
      .withMessage("debe completar el campo email")
      .bail()
      .isEmail()
      .withMessage("debe ingresar un email valido"),
    body("fechaNacimiento")
      .notEmpty()
      .withMessage("debe completar el campo fecha de nacimiento"),
    body("domicilio")
      .notEmpty()
      .withMessage("debe completar el campo domicilio"),
    body("perfilUsuario")
      .notEmpty()
      .withMessage("debe seleccionar un perfil de usuario"),
    body("contrasena")
      .notEmpty()
      .withMessage("debe completar el campo password")
      .bail()
      .isLength({ min: 8 })
      .withMessage("el password debe tener al menos 8 caracteres"),
    body("reContrasena")
      .notEmpty()
      .withMessage("debe completar el campo password2")
      .bail()
      .custom((value, { req }) => {
        if (value !== req.body.contrasena) {
          throw new Error("Las contraseñas no coinciden");
        }
        return true;
      }),
    body('foto').custom((value,{req}) => {
      let extensiones = [".png", ".jpg", ".jpeg"];
      if (req.file) {
        let ext = path.extname(req.file.originalname).toLowerCase();
        if (!extensiones.includes(ext)) {
          throw new Error("La extensión debe ser png, jpg o jpeg");
        }
        }
      return true;
      }
    )
      
  ],
  product: [
    body("name").not().isEmpty().withMessage("El nombre es requerido"),
    body("price").not().isEmpty().withMessage("El precio es requerido"),
    body("description")
      .not()
      .isEmpty()
      .withMessage("La descripción es requerida")
      .bail()
      .isLength({ max: 100 })
      .withMessage("la decripción debe contener máximo 100 caracteres"),
    body("discount")
      .notEmpty()
      .withMessage('debe completar el campo descuento si no tiene agregue cero "0"'),
    body("category").notEmpty().withMessage("debe seleccionar una opcion"),
    body('image').custom((value,{req}) => {
      let extensiones = [".jpg", ".jpeg", ".png", ".gif"];
      if(!req.file){
        throw new Error('debe subir una imagen')
      }else{
        let ext = path.extname(req.file.originalname).toLowerCase();
        if (!extensiones.includes(ext)) {
           throw new Error('debe subir una imagen con extensiones validas'+extensiones);
        }
      }
      return true;
      }
    )

  ]
};

module.exports = validation;
