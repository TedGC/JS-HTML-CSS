const express = require('express');
const usersRepo = require('../../repo/users')
const signupTemplate = require('../../view/admin/auth/signup')
const router = express.Router();

router.get('/signup', (req, res) => {
    res.send(signupTemplate({ req }))

})


router.post('/', async (req, res) => {
    const { email, password, passwordConfirmation } = req.body;

    const existingUser = await usersRepo.getOneBy({ email })
    if (existingUser) {
        return res.send('Email in use');
    }

    if (password !== passwordConfirmation) {
        return res.send('passwords must match')
    }

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

router.get('/signin', (req, res) => {
    res.send(`
    <div>
        <form method="POST">
            <input name="email" placeholder="email" />
            <input name="password" placeholder="password" />
            <button>sign in</button>
        </form>
    </div> `)
})

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    const user = await usersRepo.getOneBy({ email });

    if (!user) {
        return res.send('email not found');
    }

    const validPassword = await usersRepo.comparePasswords(
        user.password,
        password
    )

    if (!validPassword) {
        return res.send('invalid password')
    }

    req.session.userId = user.id;

    res.send('you are signed in')
})

module.exports = router;