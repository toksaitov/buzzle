import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';

import { createBrowserHistory } from 'history';
import { routerMiddleware, ConnectedRouter } from 'connected-react-router';

import thunkMiddleware from 'redux-thunk';

import rootReducerBuilder from './reducers';

import App from './App';
import * as serviceWorker from './serviceWorker';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

const history = createBrowserHistory();

const store = createStore(
    rootReducerBuilder(history),
    undefined,
    compose(
        applyMiddleware(
            routerMiddleware(history),
            thunkMiddleware
        ),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();
