import parameters from './parameters.js'
import database from './database.js'

import serverBuilder from './server.js'
const server = serverBuilder(parameters);

import users from './users.js'
users(parameters, server, database);

server.get('/', (req, res) => {
    res.render('index', { 'session': req.session })
});

database.start().then(() => {
    const port = parameters.port;
    server.listen(port, () => console.log(`Buzzle is listening on port ${port}!`))
});

