import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import Error from './Error.js';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Error />, div);
});

it('renders without crashing', () => {
  const wrapper = shallow(<Error error="Something went wrong..."/>);
  expect(wrapper.contains("Something went wrong...")).toBe(true);
});