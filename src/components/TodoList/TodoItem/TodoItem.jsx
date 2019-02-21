import React from 'react';

import './TodoItem.css';

function TodoItem(props) {
    const {
        item,
        deleteItem,
        editItem
    } = props;
    const {
        key,
        text
    } = item;

    return (
        <div className="list-item-container">
            <form onBlur={(e) => editItem(e, key)}>
                <textarea
                    className="list-item"
                    type="text"
                    placeholder={text}
                />
            </form>
            <button
                className="delete-button"
                onClick={(e) => deleteItem(key)}
            >
                delete
            </button>
        </div>
    );
};

export default TodoItem;
