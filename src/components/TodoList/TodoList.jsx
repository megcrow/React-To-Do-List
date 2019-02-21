import React from 'react';

import TodoItem from './TodoItem/TodoItem';
import './TodoList.css';

export default function TodoList ({ itemArray, addItem, deleteItem, editItem }) {
        return (
            <div className="todoListMain" >
                <div className="header">
                    <h1>My To Do List</h1>
                    <form onSubmit={addItem}>
                        <input
                        placeholder="enter task"
                        />
                        <button type="submit">add</button>
                </form>
                </div>
                <ul className="theList">
                    {itemArray.map((item) => (
                    <TodoItem
                        key={item.key}
                        item={item}
                        deleteItem={deleteItem}
                        editItem={editItem}
                    />
                    ))}
                </ul>
        </div>
    );
}
