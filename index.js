import parameters from './lib/parameters.js'
import database from './lib/database.js'

import serverBuilder from './lib/server.js'
const server = serverBuilder(parameters);

import users from './lib/users.js'
users(parameters, server, database);

import messages from './lib/messages.js'
messages(parameters, server, database);

server.get('/', (req, res) => {
    const Message = database.models.Message;
    const User = database.models.User;
    Message.findAll({
        'include': [{
            'model': User
        }]
    }).then(messages => {
        res.render('index', { messages, 'session': req.session });
    }).catch(error => {
        console.error(error);
        res.status(503).end('Service Unavailable');
    });
});

database.start().then(() => {
    const port = parameters.port;
    server.listen(port, () => console.log(`Buzzle is listening on port ${port}!`))
});

