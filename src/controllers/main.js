const mainModel = require('../models/main');
let mainController ={

    list: (req,res) => {
        let products = mainModel.getProducts()
        let visited = products.filter((product) => product.category == 'visited');
        let in_sale = products.filter((product) => product.category == 'in-sale');
        res.render('index',{visited,in_sale});
    }

};

module.exports = mainController;