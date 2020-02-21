function messages(parameters, server, database) {
    server.post('/message/create', (req, res) => {
        if (!req.session.authorized) {
            res.status(401).end('Unauthorized');
            return;
        }

        const content = req.body.content;
        if (!content) {
            req.session.error = "The message can't be empty.";
            res.redirect('/');
            return;
        }

        const Message = database.models.Message;
        Message.create({
            content, 'userId': req.session.userID
        }).then(() => {
            res.redirect('/');
        }).catch(error => {
            console.error(error);

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
            req.session.error = 'Please, specify the message to delete.';
            res.redirect('/');
            return;
        }

        const Message = database.models.Message;
        Message.findOne({ 'where': { id } }).then(message => {
            if (!message) {
                req.session.error = 'No such message.';
                res.redirect('/');
                return;
            } else if (!req.session.administrator && message.userId !== req.session.userID) {
                res.status(401).end('Unauthorized');
                return;
            }

            message.destroy().then(() => {
                res.redirect('/');
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
            req.session.error = 'Please, specify the message to edit.';
            res.redirect('/');
            return;
        }

        const Message = database.models.Message;
        Message.findOne({ 'where': { id } }).then(message => {
            if (!message) {
                req.session.error = 'No such message.';
                res.redirect('/');
                return;
            } else if (!req.session.administrator && message.userId !== req.session.userID) {
                res.status(401).end('Unauthorized');
                return;
            }

            res.render('message-edit', { message, 'session': req.session });
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
            req.session.error = 'Please, specify the message to delete.';
            res.redirect('/');
            return;
        }

        const content = req.body.content;
        if (!content) {
            req.session.error = "The message can't be empty.";
            res.redirect(`/message/${parseInt(id)}/edit`);
            return;
        }

        const Message = database.models.Message;
        Message.findOne({ 'where': { id } }).then(message => {
            if (!message) {
                req.session.error = 'No such message.';
                res.redirect('/');
                return;
            } else if (!req.session.administrator && message.userId !== req.session.userID) {
                res.status(401).end('Unauthorized');
                return;
            }

            return Message.update({ content }, { 'where' : { id } }).then(() => {
                res.redirect('/');
            });
        }).catch(error => {
            console.error(error);
            res.status(503).end('Service Unavailable');
        });
    });
}

export default messages;
