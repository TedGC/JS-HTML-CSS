const express = require('express')
const app = express() 
const path = require('path')


app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', ejs)

const comments = [
    {
        username: 'Todd',
        comment: 'lol that is so funny'
    },
    {
        username: 'Skyler', 
        comment: 'I like to go birdwatching with my dog'
    },
    {
        username: 'SkBerBoi',
        commnet: 'plz delete your coount, Todd'
    },
    {
        username: 'onlysaywoof',
        comment: 'woof woof woof'
    }
]

app.get('/commnets', (req, res) => {
    res.render('comments/index', { comments })
})

app.get('./tacos', (req, res) => {
    res.send("get tacos response")
})

app.post('./tacos', (req, res) =>{
    const {meant, qty} = req.body;
    res.send(`ok, here are your ${qty} ${meat} tacos`)
})

app.listen(3000, () => { 
    console.log("on port 3000 ")
})