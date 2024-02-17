const express = require('express')
const router = express.Router()
const {
    getProdsByCat,
    getProduct,
    createProduct,
    deleteProduct,
    updateProd,
    getFeaturedProd
} = require('../Controller/productController')

router

    //To get products by category(Category is optional)
    .get('/', getProdsByCat)

    //To get specific product
    .get('/:id', getProduct)

    //To create new products
    .post('/', createProduct)

    //To delete product
    .delete('/:id', deleteProduct)

    //To update product
    .put('/:id', updateProd)

    //To get featured products

    .get('/get/featured/:count', getFeaturedProd)

module.exports = router