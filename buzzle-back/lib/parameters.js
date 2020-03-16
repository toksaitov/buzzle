import dotenv from 'dotenv';
dotenv.config();

let dbName = process.env.BUZZLE_DB_NAME;
if (!dbName) {
    dbName = 'buzzle_db';

    console.warn(`The database name was not provided. The default value was set to '${dbName}'.`);
}

let dbUser = process.env.BUZZLE_DB_USER;
if (!dbUser) {
    dbUser = 'buzzle_db_user';

    console.warn(`The database user was not set. The default value is selected to '${dbUser}'.`);
}

const dbPass = process.env.BUZZLE_DB_PASS;
if (!dbPass) {
    throw new Error('The database password was not provided. Please specify it in the .env file.');
}

let dbHost = process.env.BUZZLE_DB_HOST;
if (!dbHost) {
    dbHost = 'localhost';

    console.warn(`The database host was not set. The default value is selected to '${dbHost}'.`);
}

let dbPort = process.env.BUZZLE_DB_PORT;
if (!dbPort) {
    dbPort = '3306';

    console.warn(`The database port was not provided. The default value is set to '${dbPort}'.`);
}
dbPort = parseInt(dbPort);

let dbDialect = process.env.BUZZLE_DB_DIALECT;
if (!dbDialect) {
    dbDialect = 'mysql';

    console.warn(`The database dialect was not provided. The default value is set to '${dbDialect}'.`);
}

let dbTimeout = process.env.BUZZLE_DB_TIMEOUT;
if (!dbTimeout) {
    dbTimeout = '2000';

    console.warn(`The database reconnection timeout was not provided. The default value is set to '${dbTimeout}'.`);
}
dbTimeout = parseInt(dbTimeout);

let dbSessionHost = process.env.BUZZLE_SESSION_DB_HOST;
if (!dbSessionHost) {
    dbSessionHost = 'localhost';

    console.warn(`The session database host was not provided. The default value is set to '${dbSessionHost}'.`);
}

let dbSessionPort = process.env.BUZZLE_SESSION_DB_PORT;
if (!dbSessionPort) {
    dbSessionPort = '6379';

    console.warn(`The session database port was not provided. The default value is set to '${dbSessionPort}'.`);
}
dbSessionPort = parseInt(dbSessionPort);

let dbSessionName = process.env.BUZZLE_SESSION_DB_NAME;
if (!dbSessionName) {
    dbSessionName = '0';

    console.warn(`The session database name was not provided. The default value is set to '${dbSessionName}'.`);
}
dbSessionName = parseInt(dbSessionName);

let dbSessionPass = process.env.BUZZLE_SESSION_DB_PASS;
if (!dbSessionPass) {
    throw new Error('The session database password was not provided. Please specify it in the .env file.');
}

let dbSessionPrefix = process.env.BUZZLE_SESSION_DB_PREFIX;
if (!dbSessionPrefix) {
    dbSessionPrefix = null;
}

const sessionSecret = process.env.BUZZLE_SESSION_SECRET;
if (!sessionSecret) {
    throw new Error('The session secret was not specified. Please add it to the .env file.');
}

let port = process.env.BUZZLE_PORT;
if (!port) {
    port = '8080';

    console.warn(`The port was not specified. The default value is set to '${port}'.`);
}
port = parseInt(port);

let minLoginLength = process.env.BUZZLE_MIN_LOGIN_LENGTH;
if (!minLoginLength) {
    minLoginLength = '3';

    console.warn(`The minimum login length was not specified. The default value is set to '${minLoginLength}'.`);
}
minLoginLength = parseInt(minLoginLength);

let minPassLength = process.env.BUZZLE_MIN_PASS_LENGTH;
if (!minPassLength) {
    minPassLength = '7';

    console.warn(`The minimum password length was not specified. The default value is set to '${minPassLength}'.`);
}
minPassLength = parseInt(minPassLength);

let passHashingRounds = process.env.BUZZLE_HASHING_ROUNDS;
if (!passHashingRounds) {
    passHashingRounds = '8';

    console.warn(`The password hashing rounds was not set. The default value is selected to '${passHashingRounds}'.`);
}
passHashingRounds = parseInt(passHashingRounds);

const adminUser = process.env.BUZZLE_ADMIN_USER;
if (!adminUser) {
    throw new Error('The admin login was not specified. Please add it to the .env file.');
}

const adminPass = process.env.BUZZLE_ADMIN_PASS;
if (!adminPass) {
    throw new Error('The admin password was not specified. Please add it to the .env file.');
}

export default {
    dbName,
    dbUser,
    dbPass,
    dbHost,
    dbPort,
    dbDialect,
    dbTimeout,
    dbSessionHost,
    dbSessionPort,
    dbSessionName,
    dbSessionPass,
    dbSessionPrefix,
    sessionSecret,
    port,
    passHashingRounds,
    minLoginLength,
    minPassLength,
    adminUser,
    adminPass
};
