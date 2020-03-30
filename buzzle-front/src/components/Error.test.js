import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import Error from './Error.js';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Error />, div);
});

it('renders without crashing with error', () => {
  const wrapper = shallow(<Error error="Something went wrong..." />);
  expect(wrapper.contains("Something went wrong...")).toBe(true);
});

it('renders without crashing with empty error', () => {
  const wrapper = shallow(<Error error="" />);
  expect(wrapper.contains("Something went wrong...")).toBe(true);
});

it('renders correctly and equal to snapshot', () => {
  const tree = renderer.create(<Error error="Something went wrong..." />)
                       .toJSON();

  expect(tree).toMatchSnapshot();
});