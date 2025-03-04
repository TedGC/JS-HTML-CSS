const { check } = require('express-validator')
const usersRepo = require('../../repo/users')


//separating the express-validator component from "auth.js" for 
//ease of reference and future update/modification

module.exports = {
    requireTitle:
        check('title')
            .trim()
            .isLength({ min: 5, max: 40 })
            .withMessage('Must be between 5 and 40 characters')
    ,
    requirePrice:
        check('price')
            .trim()
            .toFloat()
            .isFloat({ min: 1 })
            .withMessage('Must be a number greater than 1')
    ,
    requireEmail:
        check('email')
            .trim()
            .normalizeEmail()
            .isEmail()
            .withMessage('Must be a valid email')
            .custom(async (email) => {
                const existingUser = await usersRepo.getOneBy({ email })
                if (existingUser) {
                    throw new Error('Email in use')
                }
            }),

    requirePassword:
        check('password')
            .trim()
            .isLength({ min: 4, max: 20 }),

    requirePasswordConfirmation:
        check('passwordConfirmation')
            .trim()
            .isLength({ min: 4, max: 20 })
            .custom((passwordConfirmation, { req }) => {
                if (passwordConfirmation !== req.body.password) {
                    throw new Error('Passwords must match')
                }
            }),

    requireEmailExists:
        check('email')
            .trim()
            .normalizeEmail()
            .isEmail()
            .withMessage('must provide a valid email')
            .custom(async (email) => {
                const user = await usersRepo.getOneBy({ email })
                if (!user) {
                    throw new Error('Email not found');
                }
            }),

    requireValidPasswordsForUser:
        check('password')
            .trim()
            .custom(async (password, { req }) => {
                const user = await usersRepo.getOneBy({ email: req.body.email })
                if (!user) {
                    throw new Error('invalid password')
                }

                const validPassword = await usersRepo.comparePasswords(
                    user.password,
                    password
                )
                if (!validPassword) {
                    throw new Error('invalid password')
                }
            })
}