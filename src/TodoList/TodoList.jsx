import React from "react";

import TodoItem from "./TodoItem/TodoItem"
import "./TodoList.css";

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        }
    }

    componentDidMount() {
        this.hydrateStateWithLocalStorage();
        // add event listener to save state to localStorage
        // when user leaves/refreshes the page
        window.addEventListener(
            'beforeunload',
            this.saveStateToLocalStorage
        );
    }
    
    componentWillUnmount() {
        window.removeEventListener(
            'beforeunload',
            this.saveStateToLocalStorage
        ); 
    }
    
    hydrateStateWithLocalStorage = () => {
        // if the key exists in localStorage
        if (localStorage.hasOwnProperty('items')) {
            // get the key's value from localStorage
            let value = localStorage.getItem('items');

            // parse the localStorage string and setState
            try {
                console.log(value);
                value = JSON.parse(value);
                this.setState({ items: value });
            } catch (e) {
                // handle empty string
                this.setState({ items: value });
            }
        }
    }
    
    saveStateToLocalStorage = () => {
        localStorage.setItem('items', JSON.stringify(this.state.items));
    }
    
    isNullOrWhiteSpace(str) {
        return (!str || str.length === 0 || /^\s*$/.test(str))
    }

    addItem = (e) => {
        if (!this.isNullOrWhiteSpace(this._inputElement.value)) {
            var newItem = {
                text: this._inputElement.value,
                key: Date.now()
            };

            this.setState((prevState) => {
                return {
                    items: prevState.items.concat(newItem)
                };
            });
            this._inputElement.value = "";
        }
        e.preventDefault();
    }


    deleteItem = (key) => {
        const {
            items
        } = this.state;

        var filteredItems = items.filter((item) => {
            return (item.key !== key);
        });
        this.setState({
            items: filteredItems
        });
    }

    editItem = (key, value) => {
        const {
            items
        } = this.state;
        const editedItem = {
            text: value,
            key: Date.now()
        };

        if (this.isNullOrWhiteSpace(editedItem.text)) {
            return;
        }

        const newItems = items.reduce((arr, item) => {
            if (item.key === key) {
                arr.push(editedItem);
            } else {
                arr.push(item);
            }
            return arr;
        }, []); 

        this.setState(() => {
            return {
                items: newItems
            };
        });
    }

    render() {
        const {
            items
        } = this.state;

        return (
            <div className="todoListMain" >
                <div className="header">
                    <h1>My To Do List</h1>
                    <form onSubmit={this.addItem}>
                        <input ref={(a) => this._inputElement = a}
                            placeholder="enter task">
                        </input>
                        <button type="submit">add</button>
                    </form>
                </div>
                <ul className="theList">
                    {items.map((item) => (
                        <TodoItem
                            key={item.key}
                            item={item}
                            deleteItem={this.deleteItem}
                            editItem={this.editItem}
                        />
                    ))}
                </ul>
            </div>
        );
    }
}

export default TodoList
