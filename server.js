import express from 'express'
import session from 'express-session'

function serverBuilder(parameters) {
    const server = express();
    server.use(express.static('public'));
    server.use(express.urlencoded({ extended: false }));
    server.set('view engine', 'ejs');
    server.use(session({
        secret: parameters.sessionSecret,
        resave: false,
        saveUninitialized: true
    }));

    return server;
}

export default serverBuilder;
