import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import Messages from './Messages.js';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Messages />, div);
});
