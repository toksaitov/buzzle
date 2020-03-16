function messages(parameters, server, database) {
    server.post('/message/create', (req, res) => {
        if (!req.session.authorized) {
            res.status(401).end('Unauthorized');
            return;
        }

        const content = req.body.content;
        if (!content) {
            server.handleError(req, res, {
                'error': "The message can't be empty.",
                'redirect': '/'
            });
            return;
        }

        const Message = database.models.Message;
        Message.create({
            content, 'userId': req.session.userID
        }).then(message => {
            res.format({
                'text/html': () => {
                    res.redirect('/');
                },
                'application/json': () => {
                    res.json({
                        'message': {
                            'id': message.id,
                            'content': message.content,
                            'createdAt': message.createdAt,
                            'updatedAt': message.updatedAt,
                            'user': {
                                'id': req.session.userID,
                                'login': req.session.login
                            }
                        }
                    });
                }
            });
        }).catch(error => {
            console.error(error);
            res.status(503).end('Service Unavailable');
        });
    });

    server.post('/message/:id/delete', (req, res) => {
        if (!req.session.authorized) {
            res.status(401).end('Unauthorized');
            return;
        }

        const id = req.params.id;
        if (!id) {
            server.handleError(req, res, {
                'error': 'Please, specify the message to delete.',
                'redirect': '/'
            });
            return;
        }

        const Message = database.models.Message;
        Message.findOne({ 'where': { id } }).then(message => {
            if (!message) {
                server.handleError(req, res, {
                    'error': 'No such message.',
                    'redirect': '/'
                });
                return;
            } else if (!req.session.administrator && message.userId !== req.session.userID) {
                res.status(401).end('Unauthorized');
                return;
            }

            message.destroy().then(() => {
                res.format({
                    'text/html': () => {
                        res.redirect('/');
                    },
                    'application/json': () => {
                        res.json({
                            'message': null
                        });
                    }
                });
            });
        }).catch(error => {
            console.error(error);
            res.status(503).end('Service Unavailable');
        });
    });

    server.get('/message/:id/edit', (req, res) => {
        if (!req.session.authorized) {
            res.status(401).end('Unauthorized');
            return;
        }

        const id = req.params.id;
        if (!id) {
            server.handleError(req, res, {
                'error': 'Please, specify the message to edit.',
                'redirect': '/'
            });
            return;
        }

        const Message = database.models.Message;
        Message.findOne({ 'where': { id } }).then(message => {
            if (!message) {
                server.handleError(req, res, {
                    'error': 'no such message.',
                    'redirect': '/'
                });
                return;
            } else if (!req.session.administrator && message.userId !== req.session.userID) {
                res.status(401).end('Unauthorized');
                return;
            }

            res.format({
                'text/html': () => {
                    res.render('message-edit', { message, 'session': req.session });
                },
                'application/json': () => {
                    res.json({
                        'message': {
                            'id': message.id,
                            'content': message.content,
                            'createdAt': message.createdAt,
                            'updatedAt': message.updatedAt,
                            'user': {
                                'id': req.session.userID,
                                'login': req.session.login
                            }
                        }
                    });
                }
            });
        }).catch(error => {
            console.error(error);
            res.status(503).end('Service Unavailable');
        });
    });

    server.post('/message/:id/edit', (req, res) => {
        if (!req.session.authorized) {
            res.status(401).end('Unauthorized');
            return;
        }

        const id = req.params.id;
        if (!id) {
            server.handleError(req, res, {
                'error': 'Please, specify the message to delete.',
                'redirect': '/'
            });
            return;
        }

        const content = req.body.content;
        if (!content) {
            server.handleError(req, res, {
                'error': "The message can't be empty.",
                'redirect': `/message/${parseInt(id)}/edit`
            });
            return;
        }

        const Message = database.models.Message;
        Message.findOne({ 'where': { id } }).then(message => {
            if (!message) {
                server.handleError(req, res, {
                    'error': 'No such message.',
                    'redirect': '/'
                });
                return;
            } else if (!req.session.administrator && message.userId !== req.session.userID) {
                res.status(401).end('Unauthorized');
                return;
            }

            return message.update({ content }).then(() => {
                res.format({
                    'text/html': () => {
                        res.redirect('/');
                    },
                    'application/json': () => {
                        res.json({
                            'message': {
                                'id': message.id,
                                'content': message.content,
                                'createdAt': message.createdAt,
                                'updatedAt': Date.now(),
                                'user': {
                                    'id': req.session.userID,
                                    'login': req.session.login
                                }
                            }
                        });
                    }
                });
            });
        }).catch(error => {
            console.error(error);
            res.status(503).end('Service Unavailable');
        });
    });
}

export default messages;
