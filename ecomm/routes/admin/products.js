const express = require('express');
const multer = require('multer');


const { handleErrors, requireAuth } = require('./middleware')
const productRepo = require('../../repo/products')
const productsNewTemplate = require('../../view/admin/products/new')
const productsIndexTemplate = require('../../view/admin/products/index')
const { requireTitle, requirePrice } = require('./validators')

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() })




router.get('/admin/products/index', requireAuth, async (req, res) => {
    const products = await productRepo.getAll();
    res.send(productsIndexTemplate({ products }))

})

router.get('/admin/products/new', requireAuth, (req, res) => {
    res.send(productsNewTemplate({}))
})
//order of middleware in execution matters and should be taken with 
// meticulous maneuver and ordering 
router.post('/admin/products/new',
    requireAuth,
    upload.single('image'),
    [
        requireTitle,
        requirePrice
    ],
    handleErrors(productsNewTemplate),
    async (req, res,) => {
        //replacing with the middleware handling function 'handleError'

        // const errors = validationResult(req);

        // if (!errors.isEmpty()) {
        //     res.send(productsNewTemplate({ errors }))
        // }
        const image = req.file ? req.file.buffer.toString('base64') : '';
        const { title, price } = req.body;
        await productRepo.create({ title, price, image })
        // console.log(req.body)
        // console.log(errors)

        res.redirect('/admin/products')

    })

router.get('/admin/products/:id/edit', (req, res) => {
    console.log(req.params.id)
})


module.exports = router;