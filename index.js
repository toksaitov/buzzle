const express = require('express')
require('dotenv').config()

const app = express()
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index')
});

app.get('/login', (req, res) => {
    res.render('login')
});

app.get('/register', (req, res) => {
    res.render('register')
});

const port = process.env.BUZZLE_PORT
app.listen(port, () => console.log(`Buzzle is listening on port ${port}!`))
