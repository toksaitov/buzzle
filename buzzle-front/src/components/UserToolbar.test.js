import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from "react-router-dom";

import UserToolbar from './UserToolbar.js';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Router><UserToolbar /></Router>, div);
});

it('renders correctly and equal to snapshot', () => {
    const tree = renderer.create(<Router><UserToolbar /></Router>)
                         .toJSON();

    expect(tree).toMatchSnapshot();
});