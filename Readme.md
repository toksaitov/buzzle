Buzzle
======

Buzzle is a better clone of Twitter.

## Required Software

* Node.js with npm (version 12 or higher)
* MySQL (version 8 or higher)

## Manual Deployment

To start the app, first create a `.env` with
the following parameters:

* `BUZZLE_DB_HOST` with a database host (defaults to 'localhost')
* `BUZZLE_DB_PORT` with a database port (defaults to '3306')
* `BUZZLE_DB_NAME` with a database name (defaults to 'buzzle\_db')
* `BUZZLE_DB_USER` with a database user (defaults to 'buzzle\_db\_user')
* `BUZZLE_DB_PASS` with a database password (required)
* `BUZZLE_DB_DIALECT` with a database dialect (defaults to 'mysql')
* `BUZZLE_DB_TIMEOUT` with a database reconnection timeout (defaults to 2000)
* `BUZZLE_SESSION_SECRET` with a session secret for cookies processing (required)
* `BUZZLE_HASHING_ROUNDS` with hashing rounds (defaults to '8')
* `BUZZLE_PORT` with the port of the web application (defaults to '8080')
* `BUZZLE_ADMIN_USER` with the login name of the administrator (required)
* `BUZZLE_ADMIN_PASS` with the password of the administrator's account (required)
* `BUZZLE_MIN_LOGIN_LENGTH` with the minimum login length (defaults to 3)
* `BUZZLE_MIN_PASS_LENGTH` with the minimum password length (defaults to 7)

For example:

```
BUZZLE_DB_HOST=localhost
BUZZLE_DB_PORT=3306
BUZZLE_DB_NAME=buzzle_db
BUZZLE_DB_USER=buzzle_db_user
BUZZLE_DB_PASS=...
BUZZLE_DB_DIALECT=mysql
BUZZLE_DB_TIMEOUT=2000

BUZZLE_SESSION_SECRET=...
BUZZLE_HASHING_ROUNDS=8

BUZZLE_PORT=8080

BUZZLE_ADMIN_USER=chief
BUZZLE_ADMIN_PASS=...

BUZZLE_MIN_LOGIN_LENGTH=3
BUZZLE_MIN_PASS_LENGTH=7
```

After that, install npm dependencies and start the server.

```
npm install
npm start
```

## Deployment through Docker

1. Install Docker and Docker Compose.
2. Create an `.env` file as described in 'Manual Deployment'.
3. Start the database container and the buzzle container with `docker-compose up`.
3. For development environments to be able to modify files while the container
   is running, start the system with `docker-compose -f docker-compose.yml -f docker-compose.development.yml up`. Ensure to run `npm install` locally before starting the development containers.

## Credits

Buzzle was created by Dmitrii Toskaitov <dmitrii@toksaitov.com>
