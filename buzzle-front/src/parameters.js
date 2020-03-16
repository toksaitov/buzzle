let apiProtocol = process.env.REACT_APP_BUZZLE_API_PROTOCOL;
if (!apiProtocol) {
    apiProtocol = 'http';

    console.warn(`The API protocol was not provided. The default value is set to '${apiProtocol}'.`);
}

let apiHost = process.env.REACT_APP_BUZZLE_API_HOST;
if (!apiHost) {
    apiHost = 'localhost';

    console.warn(`The API host was not provided. The default value was set to '${apiHost}'.`);
}

let apiPort = process.env.REACT_APP_BUZZLE_API_PORT;
if (!apiPort) {
    apiPort = '3000';

    console.warn(`The API port was not set. The default value is selected to '${apiPort}'.`);
}

const apiURL = `${apiProtocol}://${apiHost}:${apiPort}`

export default {
    apiProtocol, apiHost, apiPort, apiURL
};
