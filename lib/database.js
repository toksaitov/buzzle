import bcrypt from 'bcryptjs'
import Sequelize from 'sequelize'

import parameters from './parameters.js'

const connection = new Sequelize(
    parameters.dbName, parameters.dbUser, parameters.dbPass, {
    'host': parameters.dbHost,
    'port': parameters.dbPort,
    'dialect': parameters.dbDialect
});

const User = connection.define('user', {
    'login': {
        'type': Sequelize.STRING,
        'allowNull': false,
        'unique': true
    },
    'password': {
        'type': Sequelize.STRING,
        'allowNull': false
    },
    'administrator': {
        'type': Sequelize.BOOLEAN,
        'allowNull': false,
        'defaultValue': false
    }
});

const Message = connection.define('message', {
    'content': {
        'type': Sequelize.STRING,
        'allowNull': false
    }
});

User.hasMany(Message);
Message.belongsTo(User);

export default {
    connection,

    'models': {
        User, Message
    },

    'start': () => {
        const hashedPassword = bcrypt.hashSync(
            parameters.adminPass,
            bcrypt.genSaltSync(+parameters.passHashingRounds)
        );
        return connection.sync().then(() => User.upsert({
            'login': parameters.adminUser,
            'password': hashedPassword,
            'administrator': true
        }));
    }
};
