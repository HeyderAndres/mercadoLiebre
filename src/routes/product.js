const express = require('express');
const router = express.Router();
const multerPoduct = require('../middleware/multerProduct');
const validation = require('../middleware/validation')
const productsController = require('../controllers/product');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', productsController.allProducts);
router.get('/create',authMiddleware, productsController.createProduct);
router.get('/search', productsController.searchProduct);
router.get('/detail/:id', productsController.detailProduct);
router.get('/edit/:id',authMiddleware, productsController.editProduct);
router.get('/list',authMiddleware, productsController.listProduct);

router.post('/createProduct',multerPoduct.single('image'),validation.product , productsController.saveProduct);

router.put('/editProduct/:id',multerPoduct.single('image'), productsController.updateProduct);

router.delete('/delete/:id', productsController.deleteProduct);

module.exports = router;