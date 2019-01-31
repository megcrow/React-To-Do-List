import React from "react";

import "./TodoItem.css";

class TodoItem extends React.Component {
    delete = () => {
        const {
            item,
            deleteItem
        } = this.props;

        deleteItem(item.key);
    }

    edit = (e) => {
        const {
            item,
            editItem
        } = this.props;
        const {
            value
        } = e.target;

        editItem(item.key, value);
    }

    render() {
        const {
            item
        } = this.props;

        return (
            <div className="list-item-container">
                <form onBlur={this.edit}> 
                    <textarea
                        className="list-item"  
                        type="text"
                        placeholder={item.text}
                    />
                </form>
                <button
                    className="delete-button" 
                    onClick={this.delete}
                >
                    delete
                </button>
            </div> 
        );
    }
};

export default TodoItem;
