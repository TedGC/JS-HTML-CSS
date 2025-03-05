const express = require('express');
const cartsRepo = require('../repo/carts')
const productsRepo = require('../repo/products')
const cartShowTemplate = require('../view/carts/show')


const router = express.Router();

//Receive a POST request to add an item to a cart
router.post('/cart/products', async (req, res) => {
    //figure out the cart
    let cart;
    if (!req.session.cartId) {
        // we don't have a cart, we need to create one,
        //and store the cart id on the req.session.cartId property
        cart = await cartsRepo.create({ items: [] })
        req.session.cartId = cart.id;


    } else {
        // we have a cart ! Lets get it from the repo
        cart = await cartsRepo.getOne(req.session.cartId);
    }


    //either increment quantity for exisitng product 

    // OR add new product to items array 



    const existingItem = cart.items.find(item => item.id === req.body.productId)
    if (existingItem) {
        // increment quantity and save cart
        existingItem.quantity++;

    } else {
        // add new product id to items array 

        cart.items.push({ id: req.body.productId, quantity: 1 });
    }

    await cartsRepo.update(cart.id, {
        items: cart.items
    })

    res.send('product added to cart')
})

//Receive a GET request to show all items in the cart
router.get('/cart', async (req, res) => {
    if (!req.session.cartId) {
        return res.redirect('/');
    }

    const cart = await cartsRepo.getOne(req.session.cartId)

    for (let item of cart.items) {
        const product = await productsRepo.getOne(item.id)

        item.product = product;
    }

    res.send(cartShowTemplate({ items: cart.items }));
})
//Receive a POST request to delete an item from the cart 

module.exports = router; 