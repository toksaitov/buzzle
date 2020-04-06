import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import Error from './Login.js';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Error />, div);
});

it('renders without crashing with error', () => {
  const wrapper = shallow(<Login error="Something went wrong..." />);
  expect(wrapper.contains("Something went wrong...")).toBe(true);
});

it('renders without crashing with empty error', () => {
  const wrapper = shallow(<Login error="" />);
  expect(wrapper.contains("Something went wrong...")).toBe(true);
});

it('renders correctly and equal to snapshot', () => {
  const tree = renderer.create(<Login error="Something went wrong..." />)
                       .toJSON();

  expect(tree).toMatchSnapshot();
});