import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

import rootReducer from './reducers';
import App from './App';

import * as serviceWorker from './serviceWorker';

const store = createStore(rootReducer)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();
