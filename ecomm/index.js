const express = require('express');
const bodyParser = require('body-parser')
const usersRepo = require('./repo/users')
const cookieSession = require('cookie-session');
const app = express()


//all of the middleware inside this app will use this app.use for than function to run 
// globally this function to all middleware 
app.use(bodyParser.urlencoded({ extendedL: true }));
app.use(cookieSession({
    keys: ['dhksdfnaslkdf']
}))
app.get('/', (req, res) => {
    res.send(`
    <div>
        <form method="POST">
            <input name="email" placeholder="email"/>
            <input name="password" placeholder="password"/>
            <input name="passwordConfirmation" placeholder="password confirmation"/>
            <button>sign up </button>
        </form>
    </div>
    `)
})

app.post('/', async (req, res) => {
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

    //sotre the id of that user inside the users cookie
    req.session.userId = user.id;

    res.send('account created!')
})

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

