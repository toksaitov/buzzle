import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import MessageForm from '../MessageForm.js';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MessageForm />, div);
});

it('renders correctly and equal to snapshot', () => {
    const tree = renderer.create(<MessageForm />)
                         .toJSON();

    expect(tree).toMatchSnapshot();
});