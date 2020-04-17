import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';

import Header from '../Header.js';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Router><Header /></Router>, div);
});

it('renders correctly and equal to snapshot', () => {
    const tree = renderer.create(<Router><Header /></Router>)
                         .toJSON();
  
    expect(tree).toMatchSnapshot();
});