import React from "react";

import "./TodoItem.css";

class TodoItem extends React.Component {
    delete = (key) => {
        this.props.delete(key);
    }

    render() {
        const {
            item
        } = this.props;

        return (
            <div className="list-item-container">
                <li className="list-item">
                    {item.text}
                </li>
                <button
                    className="delete-button" 
                    onClick={() => this.delete(item.key)}
                >
                    delete
                </button>
            </div> 
        );
    }
};

export default TodoItem;
