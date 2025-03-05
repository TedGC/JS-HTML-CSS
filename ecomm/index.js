const express = require('express');
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session');

const authRouter = require('./routes/admin/auth')
const adminProductRouter = require('./routes/admin/products')
const productRouter = require('./routes/products')
const cartsRouter = require('./routes/carts')

const app = express()

app.use(express.static('public'))

//all of the middleware inside this app will use this app.use for than function to run 
// globally this function to all middleware 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({
    keys: ['dhksdfnaslkdf']
}))

app.use(authRouter)
app.use(productRouter)
app.use(adminProductRouter)
app.use(cartsRouter)


app.listen(3000, () => {
    console.log('listening')
})



// bodyParser.urlencoded({ extended: true }), (req, res) => {
//     console.log(req.body)
//     res.send('account created');
// })


//manual approach for parsing method from Express from scratch instead of using 
// utilizing the module in the library 

// const bodyParser = (req, res, next) => {
//     if (req.method === 'POST') {
//         req.on('data', data => {
//             const parsed = (data.toString('utf8')).split('&')
//             const formData = {};
//             for (let pair of parsed) {
//                 const [key, value] = pair.split('=');
//                 formData[key] = value;
//             }
//             req.body = formData;
//             next();
//         })
//     } else {
//         next();
//     }

// }


// setting up json file in hard drive as a method of storage so that we don't have to 
//dumpt our files into the memories whenever we run the program is not efficient 
// for the reasosn below 
// 1. will error it we try to open/write to the smae file twice at the same file
// 2. won't work if we have multiple servers running on different machines
// 3. we have to write to the FS every time we want to update some data 

