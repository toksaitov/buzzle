import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import LoginForm from './LoginForm.js';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<LoginForm />, div);
});

it('renders correctly and equal to snapshot', () => {
    const tree = renderer.create(<LoginForm />)
                         .toJSON();

    expect(tree).toMatchSnapshot();
});