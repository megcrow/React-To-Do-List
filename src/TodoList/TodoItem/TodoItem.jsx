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

    function _deleteItem() {
        deleteItem(key);
    }

    function _editItem(e) {
        const {
            value
        } = e.target;

        editItem(key, value);
    }

    return (
        <div className="list-item-container">
            <form onBlur={_editItem}> 
                <textarea
                    className="list-item"  
                    type="text"
                    placeholder={text}
                />
            </form>
            <button
                className="delete-button" 
                onClick={_deleteItem}
            >
                delete
            </button>
        </div> 
    );
};

export default TodoItem;
