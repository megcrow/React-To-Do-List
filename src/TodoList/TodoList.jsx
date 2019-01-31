import React from 'react';

import TodoItem from './TodoItem/TodoItem';
import './TodoList.css';

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
            let items = localStorage.getItem('items');

            // parse the localStorage string and setState
            try {
                items = JSON.parse(items);
                this.setState({ items });
            } catch (e) {
                // handle empty string
                this.setState({ items });
            }
        }
    }
    
    saveStateToLocalStorage = () => {
        localStorage.setItem('items', JSON.stringify(this.state.items));
    }
    
    isNullOrWhiteSpace(str) {
        return (!str || str.length === 0 || /^\s*$/.test(str));
    }

    addItem = (e) => {
        e.preventDefault();
        const {
            value: text
        } = e.target[0];

        if (this.isNullOrWhiteSpace(text)) {
            return;
        }
        const newItem = {
            text,
            key: Date.now()
        };

        this.setState((prevState) => ({
            items: prevState.items.concat(newItem)
        }));
        this._inputElement.value = "";
    }


    deleteItem = (key) => {
        const {
            items
        } = this.state;

        const filteredItems = items.filter((item) => item.key !== key);

        this.setState({
            items: filteredItems
        });
    }

    editItem = (key, text) => {
        if (this.isNullOrWhiteSpace(text)) {
            return;
        }

        const {
            items
        } = this.state;

        const editedItem = {
            text,
            key: Date.now()
        };

        const newItems = items.reduce((arr, item) => {
            if (item.key === key) {
                arr.push(editedItem);
            } else {
                arr.push(item);
            }
            return arr;
        }, []); 

        this.setState(() => ({
            items: newItems
        }));
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
                        <input
                            ref={(a) => this._inputElement = a}
                            placeholder="enter task"
                        />
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
