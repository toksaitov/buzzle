import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';

import MessageForm from './MessageForm.js';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MessageForm />, div);
});

it('renders two messages', () => {
    const wrapper = mount(<MessageForm />);
    const input = wrapper.find('#message-content');
    input.simulate('change', { target: { value: 'hello' }});
    expect(wrapper.state().content).toBe('hello');
});

it('renders correctly and equal to snapshot', () => {
    const tree = renderer.create(<MessageForm />)
                         .toJSON();

    expect(tree).toMatchSnapshot();
});