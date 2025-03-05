const express = require('express');
const productRepo = require('../repo/products')
const productsIndexTemplate = require('../view/products/index')

const router = express.Router();



router.get('/', async (req, res) => {
    const products = await productRepo.getAll()
    res.send(productsIndexTemplate({ products }))
})

module.exports = router;