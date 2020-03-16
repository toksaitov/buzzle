import Sequelize from 'sequelize';
import bcrypt from 'bcryptjs';
import redis from 'redis';

function databaseBuilder(parameters) {
    const connection = new Sequelize(
        parameters.dbName, parameters.dbUser, parameters.dbPass, {
        'host': parameters.dbHost,
        'port': parameters.dbPort,
        'dialect': parameters.dbDialect
    });

    const sessionConnection = redis.createClient({
        'host': parameters.dbSessionHost,
        'port': parameters.dbSessionPort,
        'password': parameters.dbSessionPass,
        'db': parameters.dbSessionName,
        'prefix': parameters.dbSessionPrefix
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

    return {
        connection,
        sessionConnection,

        'models': {
            User, Message
        },

        'start': () => {
            const hashedPassword = bcrypt.hashSync(
                parameters.adminPass,
                bcrypt.genSaltSync(parameters.passHashingRounds)
            );
            return connection.sync().then(() => User.upsert({
                'login': parameters.adminUser,
                'password': hashedPassword,
                'administrator': true
            }));
        }
    }
}

export default databaseBuilder;
