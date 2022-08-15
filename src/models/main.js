const path = require('path');
const fs = require('fs')

mainModel = {
    file: path.resolve(__dirname, '../database/products.json'),

    getProducts: function () {
        let products = JSON.parse(fs.readFileSync(this.file))
        return products.filter(product => product.category == 'visited' || product.category == 'in-sale')

    },
}

module.exports = mainModel;