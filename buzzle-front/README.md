Buzzle
======

Buzzle is a simple clone of Twitter. This is a modernized React-based front
end for the Buzzle web application.

## Required Software

* Node.js with npm (version 13 or higher)
* Buzzle back end (the latest version)

## Manual Deployment

To start the app, first, create a `.env` with the following parameters:

* `REACT_APP_BUZZLE_API_PROTOCOL` with an API protocol (defaults to 'http')
* `REACT_APP_BUZZLE_API_HOST` with an API host (defaults to 'localhost')
* `REACT_APP_BUZZLE_API_PORT` with an API port (defaults to '3000')

For example:

```
REACT_APP_BUZZLE_API_PROTOCOL=http
REACT_APP_BUZZLE_API_HOST=localhost
REACT_APP_BUZZLE_API_PORT=3000
```

After that, install npm dependencies and start the server.

```
npm install
npm start
```

To run tests, execute:

```
npm test
```

To build the production version with minimized scripts, run:

```
npm run build
```

All the generated files will be placed into the `build` directory.

## Credits

Buzzle was created by Dmitrii Toskaitov <dmitrii@toksaitov.com>
