import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme,{ mount } from 'enzyme';
require('jest-extended');

import TodoItem from '../components/TodoList/TodoItem/TodoItem';


Enzyme.configure({ adapter: new Adapter() })

describe('TodoItem', () => {
    let wrapper;
    let deleteItem = jest.fn();
    let editItem = jest.fn();
    beforeEach(() => {
        wrapper = mount(
            <TodoItem
            item={{key: 1, text: 'mock text'}}
            deleteItem={deleteItem}
            editItem={editItem}
            />
        );
    });
    test('TodoItem component should match snapshot', () => {
        expect('wrapper').toMatchSnapshot();
    });

    test('TodoItem should have form component', () => {
        const form = wrapper.find('form')
        expect(
           form.hasClass('todo-item-form')
        ).toBe(true);
    });

    test('TodoItem should have text area component that displays the todo item text', () => {
        const listItem = wrapper.find('.list-item');
        expect(
            listItem.props()
        ).toContainEntry(['placeholder','mock text']);
    });

    test('TodoItem should have delete button', () => {
        expect(
            wrapper.find('.delete-button').text()
        ).toBe('delete');
    });

    describe('The todo item text area should be edited on blur', () => {
        beforeEach(() => {
            const todoItemForm = wrapper.find('form');
            todoItemForm.simulate('blur');
            wrapper.setProps({item:{key:'2', text:'mock edit'}})
        });

        test('fires blur event', () => {
            expect(editItem).toBeCalled()
        });

        test('should update the state property `text`', () => {
            const listItem = wrapper.find('.list-item');
            expect(
                listItem.props()
            ).toContainEntry(['placeholder','mock edit']);
        })
    });

    test('clicking the delete button should call deleteItem', () => {
        const deleteButton = wrapper.find('.delete-button');
        deleteButton.simulate('click');
        expect(deleteItem).toBeCalled();
    });
})
