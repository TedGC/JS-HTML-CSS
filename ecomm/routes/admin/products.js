const express = require('express');
const multer = require('multer');


const { handleErrors, requireAuth } = require('./middleware')
const productRepo = require('../../repo/products')
const productsNewTemplate = require('../../view/admin/products/new')
const productsIndexTemplate = require('../../view/admin/products/index')
const productsEditTemplate = require('../../view/admin/products/edit')
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

        res.redirect('/admin/products/index')

    })

router.get('/admin/products/:id/edit', async (req, res) => {
    const product = await productRepo.getOne(req.params.id)

    if (!product) {
        return res.send('product not found')
    }
    res.send(productsEditTemplate({ product }))

})

router.post('/admin/products/:id/edit',
    requireAuth,
    upload.single('image'),
    [
        requireTitle,
        requirePrice
    ],
    handleErrors(productsEditTemplate, async req => {
        const product = await productRepo.getOne(req.params.id)
        return { product }
    }),
    async (req, res) => {
        const changes = req.body;

        if (req.file) {
            changes.image = req.file ? req.file.buffer.toString('base64') : '';
        }
        try {
            await productRepo.update(req.params.id, changes)
        } catch (err) {
            return res.send('could not find item')
        }

        res.redirect('/admin/products/index')
    })

router.post('/admin/products/index/:id/delete', requireAuth, async (req, res) => {
    await productRepo.delete(req.params.id);

    res.redirect('/admin/products/index')
})
module.exports = router;