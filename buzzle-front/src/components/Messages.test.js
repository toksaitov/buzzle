import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import Messages from './Messages.js';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Messages />, div);
});

it('renders two messages', () => {
    const messages = [
        {
            "message": {
                "id": 0,
                "content": "hello",
                "createdAt": "2020-03-27T13:56:03.000Z",
                "updatedAt": "2020-03-27T13:56:03.000Z",
                "user": {
                    "id": 1,
                    "login": "chief"
                }
            }
        },
        {
            "message": {
                "id": 1,
                "content": "hi",
                "createdAt": "2020-03-27T13:56:07.000Z",
                "updatedAt": "2020-03-27T13:56:13.000Z",
                "user": {
                    "id": 1,
                    "login": "chief"
                }
            }
        }
    ];

    const wrapper = mount(<Messages messages={messages} />);
    expect(wrapper.contains("hello")).toBe(true);
    expect(wrapper.contains("hi")).toBe(true);
});