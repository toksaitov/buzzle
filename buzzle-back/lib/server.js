import express from 'express';
import session from 'express-session';
import connectRedit from 'connect-redis';
import moment from 'moment';

function serverBuilder(parameters, database) {
    const server = express();
    const RedisStore = connectRedit(session);

    server.use(express.static('public'));
    server.use(express.json());
    server.use(express.urlencoded({ extended: false }));
    server.set('view engine', 'ejs');
    server.use(session({
        'store': new RedisStore({ 'client': database.sessionConnection }),
        'secret': parameters.sessionSecret,
        'resave': false,
        'saveUninitialized': true
    }));
    server.locals.moment = moment;
    server.handleError = (req, res, data) => {
        const error = data.error || 'Something went wrong.';
        res.format({
            'text/html': () => {
                req.session.error = error;
                if (data.redirect) {
                    res.redirect(data.redirect);
                } else {
                    res.status(400).end('Bad Request');
                }
            },
            'application/json': () => {
                res.status(400).json({ error });
            }
        });
    };

    return server;
}

export default serverBuilder;
