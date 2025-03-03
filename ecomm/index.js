const express = require('express');
const bodyParser = require('body-parser')
const app = express()

//all of the middleware inside this app will use this app.use for than function to run 
// globally this function to all middleware 
app.use(bodyParser.urlencoded({ extendedL: true }));

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


//manual approach for parsing method from Express 

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

app.post('/', bodyParser.urlencoded({ extended: true }), (req, res) => {
    console.log(req.body)
    res.send('account created');
})

app.listen(3000, () => {
    console.log('listening')
})

