const express = require('express')
const Sequelize = require('sequelize')
const bcrypt = require('bcryptjs')
require('dotenv').config()

const dbName = process.env.BUZZLE_DB_NAME;
const dbUser = process.env.BUZZLE_DB_USER;
const dbPass = process.env.BUZZLE_DB_PASS;

const database = new Sequelize(dbName, dbUser, dbPass, {
    'host': process.env.BUZZLE_DB_HOST,
    'port': process.env.BUZZLE_DB_PORT,
    'dialect': process.env.BUZZLE_DB_DIALECT
});

const User = database.define('user', {
    'login': {
        'type': Sequelize.STRING,
        'allowNull': false,
        'unique': true
    },
    'password': {
        'type': Sequelize.STRING,
        'allowNull': false
    },
    'administrator': {
        'type': Sequelize.BOOLEAN,
        'allowNull': false,
        'defaultValue': false
    }
})

const Message = database.define('Message', {
    'content': {
        'type': Sequelize.STRING,
        'allowNull': false
    }
})

User.hasMany(Message)
Message.belongsTo(User)

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

database.sync().then(() => User.upsert({
    'login': process.env.BUZZLE_ADMIN_USER,
    'password': bcrypt.hashSync(process.env.BUZZLE_ADMIN_PASS,
                                bcrypt.genSaltSync(+process.env.BUZZLE_HASHING_ROUNDS))
})).then(() => {
    const port = process.env.BUZZLE_PORT
    app.listen(port, () => console.log(`Buzzle is listening on port ${port}!`))
});

