import bcrypt from 'bcryptjs'

function users(parameters, server, database) {
    server.get('/login', (req, res) => {
        res.render('login', { 'session' : req.session });
    });

    server.post('/login', (req, res) => {
        const login = req.body.login;
        if (!login) {
            server.handleError(req, res, {
                'error': 'The login was not provided.',
                'redirect': '/login'
            });
            return;
        }

        const password = req.body.password;
        if (!password) {
            server.handleError(req, res, {
                'error': 'The password was not provided.',
                'redirect': '/login'
            });
            return;
        }

        const User = database.models.User;
        User.findOne({ 'where': { login }}).then(user => {
            if (user) {
                if (!bcrypt.compareSync(password, user.password)) {
                    server.handleError(req, res, {
                        'error': 'Failed to login. Try again.',
                        'redirect': '/login'
                    });
                    return;
                }

                req.session.userID = user.id;
                req.session.login = user.login;
                req.session.authorized = true;
                req.session.administrator = user.administrator;

                res.format({
                    'text/html': () => {
                        res.redirect('/');
                    },
                    'application/json': () => {
                        res.json({
                            'user': {
                                'id': user.id,
                                'login': user.login,
                                'authorized': true,
                                'administrator': user.administrator
                            }
                        });
                    }
                });
            } else {
                server.handleError(req, res, {
                    'error': 'Failed to login. Try again.',
                    'redirect': '/login'
                });
            }
        }).catch(error => {
            console.error(error);
            response.status(503).end('Service Unavailable');
        });
    });

    server.post('/logout', (req, res) => {
        req.session.regenerate(() => {
            res.format({
                'text/html': () => {
                    res.redirect('/');
                },
                'application/json': () => {
                    res.json({
                        'user': null
                    });
                }
            });
        });
    });

    server.get('/register', (req, res) => {
        res.render('register', { 'session': req.session });
    });

    server.post('/register', (req, res) => {
        const login = req.body.login;
        if (!login) {
            server.handleError(req, res, {
                'error': 'The login was not provided.',
                'redirect': '/register'
            });
            return;
        }

        if (login.length < parameters.minLoginLength) {
            server.handleError(req, res, {
                'error': `The login should be at least ${parameters.minLoginLength} characters long.`,
                'redirect': '/register'
            });
            return;
        }

        const password = req.body.password;
        if (!password) {
            server.handleError(req, res, {
                'error': 'The password was not provided.',
                'redirect': '/register'
            });
            return;
        }

        if (password.length < parameters.minPassLength) {
            server.handleError(req, res, {
                'error': `The password should be at least ${parameters.minPassLength} characters long.`,
                'redirect': '/register'
            });
            return;
        }

        const passwordRepeat = req.body['password-repeat'];
        if (!passwordRepeat) {
            server.handleError(req, res, {
                'error': 'The password was not repeated.',
                'redirect': '/register'
            });
            return;
        }

        if (password != passwordRepeat) {
            server.handleError(req, res, {
                'error': 'The passwords are not the same.',
                'redirect': '/register'
            });
            return;
        }

        const User = database.models.User;
        User.findOne({ 'where': { login }}).then(user => {
            if (user) {
                server.handleError(req, res, {
                    'error': 'The login name is not available. Select a different login.',
                    'redirect': '/register'
                });
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

                res.format({
                    'text/html': () => {
                        res.redirect('/');
                    },
                    'application/json': () => {
                        res.json({
                            'user': {
                                'id': user.id,
                                'login': user.login,
                                'authorized': true,
                                'administrator': user.administrator
                            }
                        });
                    }
                });
            });
        }).catch(error => {
            console.error(error);
            response.status(503).end('Service Unavailable');
        });
    });
}

export default users;
