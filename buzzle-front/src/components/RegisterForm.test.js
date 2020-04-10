import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import RegisterForm from './RegisterForm.js';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<RegisterForm />, div);
});

it('renders correctly and equal to snapshot', () => {
    const tree = renderer.create(<RegisterForm />)
                         .toJSON();

    expect(tree).toMatchSnapshot();
});