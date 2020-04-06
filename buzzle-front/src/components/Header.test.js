import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import Header from './Header.js';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Header />, div);
});

it('renders without crashing with error', () => {
const wrapper = shallow(<Header error="Something went wrong..." />);
expect(wrapper.contains("Something went wrong...")).toBe(true);
});

it('renders without crashing with empty error', () => {
const wrapper = shallow(<Header error="Something has gone completely wrong!" />);
expect(wrapper.contains("Something went wrong...")).toBe(true);
});
