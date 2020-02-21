import express from 'express'
import session from 'express-session'
import moment from 'moment'

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
    server.locals.moment = moment;

    return server;
}

export default serverBuilder;
