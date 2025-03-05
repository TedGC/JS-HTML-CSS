const express = require('express');


const { handleErrors } = require('./middleware')
const usersRepo = require('../../repo/users')
const signupTemplate = require('../../view/admin/auth/signup')
const signinTemplate = require('../../view/admin/auth/signin')
const {
    requireEmail,
    requirePassword,
    requirePasswordConfirmation,
    requireValidPasswordsForUser,
    requireEmailExists
} = require('./validators')

const router = express.Router();
//signup template for future structuring of the application
router.get('/signup', (req, res) => {
    res.send(signupTemplate({ req }))
})


//signup validation process 
router.post('/signup',
    [
        requireEmail,
        requirePassword,
        requirePasswordConfirmation
    ],
    handleErrors(signupTemplate),
    async (req, res) => {
        // const errors = validationResult(req);
        // console.log(errors);
        // if (!errors.isEmpty()) {
        //     return res.send(signupTemplate({ req, errors }))
        // }

        //used to be 'passwordconfirmation property in this deconsdtructor
        const { email, password } = req.body;

        //create a user in our user repo to represent this person
        const user = await usersRepo.create({ email, password })

        //store the id of that user inside the users cookie
        req.session.userId = user.id;

        res.redirect('/admin/products')
    })



router.get('/singout', (req, res) => {
    req.session = null;
    res.send('you are logged out')
})


//signin template process as mentioned above for "signup"
router.get('/signin', (req, res) => {
    res.send(signinTemplate({}))
})


//singin validatino such as comparing passwords, checking whether
//password input are valid or not 
router.post('/signin', [
    requireEmailExists,
    requireValidPasswordsForUser

],
    handleErrors(signinTemplate),

    async (req, res) => {

        // const errors = validationResult(req);

        // if (!errors.isEmpty()) {
        //     return res.send(signinTemplate({ errors }))
        // }

        /// fix #1 to solve the issue for router.get('./admin/products)
        // 1. I first made the change to the link path  from './admin/products' to '/admin/products/index
        // 2. enables const user = await usersRepo.getOneBy({email}) below which was once disabled as instructed from the course
        // 3. I updated this function in products.js into the ternary function const image = req.file ? req.file.buffer.toString('base64') : '';
        // 4. I added    else { return true   statement in "requirePasswordConfirmation" in validators.js
        // #4 has more to do with adding hash values to the password 
        // 5. 
        const { email } = req.body;
        const user = await usersRepo.getOneBy({ email })
        // no need to pull off 'password' property from req.body 
        // becasue it's already covered in the validator section
        //const {email, password} = req.body;

        // const user = await usersRepo.getOneBy({ email });

        // if (!user) {
        //     return res.send('email not found');
        // }



        req.session.userId = user.id;

        res.redirect('/admin/products')
    })

module.exports = router;