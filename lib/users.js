import bcrypt from 'bcryptjs'

function users(parameters, server, database) {
    server.get('/login', (req, res) => {
        res.render('login', { 'session' : req.session });
    });

    server.post('/login', (req, res) => {
        const login = req.body.login;
        if (!login) {
            req.session.error = 'The login was not provided.';
            res.redirect('/login');
            return;
        }

        const password = req.body.password;
        if (!password) {
            req.session.error = 'The password was not provided.';
            res.redirect('/login');
            return;
        }

        const User = database.models.User;
        User.findOne({ 'where': { login }}).then(user => {
            if (user) {
                if (!bcrypt.compareSync(password, user.password)) {
                    req.session.error = 'Failed to login. Try again.';
                    res.redirect('/login');
                    return;
                }

                req.session.userID = user.id;
                req.session.login = user.login;
                req.session.authorized = true;
                req.session.administrator = user.administrator;

                res.redirect('/');
            } else {
                req.session.error = 'Failed to login. Try again.';
                res.redirect('/login');
            }
        }).catch(error => {
            console.error(error);
            response.status(503).end('Service Unavailable');
        });
    });

    server.post('/logout', (req, res) => {
        req.session.regenerate(() => {
            res.redirect('/');
        });
    });

    server.get('/register', (req, res) => {
        res.render('register', { 'session': req.session });
    });

    server.post('/register', (req, res) => {
        const login = req.body.login;
        if (!login) {
            req.session.error = 'The login was not provided.';
            res.redirect('/register');
            return;
        }

        const password = req.body.password;
        if (!password) {
            req.session.error = 'The password was not provided.';
            res.redirect('/register');
            return;
        }

        const passwordRepeat = req.body['password-repeat'];
        if (!passwordRepeat) {
            req.session.error = 'The password was not repeated.';
            res.redirect('/register');
            return;
        }

        if (password != passwordRepeat) {
            req.session.error = 'The passwords are not the same.';
            res.redirect('/register');
            return;
        }

        const User = database.models.User;
        User.findOne({ 'where': { login }}).then(user => {
            if (user) {
                req.session.error = 'The login name is not available. Select a different login.';
                res.redirect('/register');
                return;
            }

            const hashedPassword = bcrypt.hashSync(
                password, bcrypt.genSaltSync(+parameters.passHashingRounds)
            );
            return User.create({
                'login': login,
                'password': hashedPassword,
                'administrator': false
            }).then(user => {
                req.session.userID = user.id;
                req.session.login = user.login;
                req.session.authorized = true;
                req.session.administrator = user.administrator;

                res.redirect('/');
            });
        }).catch(error => {
            console.error(error);
            response.status(503).end('Service Unavailable');
        });
    });
}

export default users;
