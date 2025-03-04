const express = require('express');
const { check, validationResult } = require('express-validator')
const usersRepo = require('../../repo/users')
const signupTemplate = require('../../view/admin/auth/signup')
const router = express.Router();
const signinTemplate = require('../../view/admin/auth/signin')
const {
    requireEmail,
    requirePassword,
    requirePasswordConfirmation,
    requireValidPasswordsForUser,
    requireEmailExists
} = require('./validators')


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
    async (req, res) => {
        const errors = validationResult(req);
        console.log(errors);
        if (!errors.isEmpty()) {
            return res.send(signupTemplate({ req, errors }))
        }
        const { email, password, passwordConfirmation } = req.body;

        //create a user in our user repo to represent this person
        const user = await usersRepo.create({ email, password })

        //store the id of that user inside the users cookie
        req.session.userId = user.id;

        res.send('account created!')
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

    async (req, res) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.send(signinTemplate({ errors }))
        }

        const { email } = req.body;

        // no need to pull off 'password' property from req.body 
        // becasue it's already covered in the validator section
        //const {email, password} = req.body;

        // const user = await usersRepo.getOneBy({ email });

        // if (!user) {
        //     return res.send('email not found');
        // }

        req.session.userId = req.body.id;

        res.send('you are signed in')
    })

module.exports = router;