const express = require('express');
const { validationResult } = require('express-validator')
const multer = require('multer');

const productRepo = require('../../repo/products')
const productsNewTemplate = require('../../view/admin/products/new')
const { requireTitle, requirePrice } = require('./validators')

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() })


router.get('./admin/products', (req, res) => {

})

router.get('/admin/products/new', (req, res) => {
    res.send(productsNewTemplate({}))
})

router.post('/admin/products/new',

    //order of middleware in execution matters and should be taken with 
    // meticulous maneuver and ordering 
    upload.single('image'),
    [
        requireTitle,
        requirePrice
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.send(productsNewTemplate({ errors }))
        }
        const image = req.file.buffer.toStinrg('base64')
        const { title, price } = req.body;
        await productRepo.create({ title, price, image })
        // console.log(req.body)
        // console.log(errors)

        res.send('submitted')
    })

module.exports = router;