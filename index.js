import parameters from './lib/parameters.js'
import database from './lib/database.js'

import serverBuilder from './lib/server.js'
const server = serverBuilder(parameters);

import users from './lib/users.js'
users(parameters, server, database);

import messages from './lib/messages.js'
messages(parameters, server, database);

server.get(['/', '/messages'], (req, res) => {
    const Message = database.models.Message;
    const User = database.models.User;
    Message.findAll({
        'include': [{
            'model': User
        }]
    }).then(messages => {
        res.format({
            'text/html': () => {
                res.render('index', { messages, 'session': req.session, 'message': null });
            },
            'application/json': () => {
                const data = messages.map(message => {
                    return {
                        'message': {
                            'id': message.id,
                            'content': message.content,
                            'createdAt': message.createdAt,
                            'updatedAt': message.updatedAt,
                            'user': {
                                'id': message.user.id,
                                'login': message.user.login
                            }
                        }
                    }
                });
                res.json({ 'messages': data });
            }
        });
    }).catch(error => {
        console.error(error);
        res.status(503).end('Service Unavailable');
    });
});

(function loop() {
    setTimeout(() => {
        database.start().then(() => {
            const port = parameters.port;
            server.listen(port, () => console.log(`Buzzle is listening on port ${port}!`))
        }).catch(error => {
            console.error(error);
            console.error("Failed to connect. Trying again...");

            loop();
        });
    }, parameters.dbTimeout);
})();

