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

    // Save todo list items to local storage so they persist when page reloads    
    componentDidMount() {
        this.hydrateStateWithLocalStorage();
    
        // add event listener to save state to localStorage
        // when user leaves/refreshes the page
        window.addEventListener(
          "beforeunload",
          this.saveStateToLocalStorage.bind(this)
        );
    }
    
    componentWillUnmount() {
        window.removeEventListener(
          "beforeunload",
          this.saveStateToLocalStorage.bind(this)
        );
    
        // saves if component has a chance to unmount
        this.saveStateToLocalStorage();
    }
    
    hydrateStateWithLocalStorage() {
        // for all items in state
        for (let key in this.state) {
          // if the key exists in localStorage
          if (localStorage.hasOwnProperty(key)) {
            // get the key's value from localStorage
            let value = localStorage.getItem(key);
    
            // parse the localStorage string and setState
            try {
              value = JSON.parse(value);
              this.setState({ [key]: value });
            } catch (e) {
              // handle empty string
              this.setState({ [key]: value });
            }
          }
        }
    }
    
    saveStateToLocalStorage() {
        // for every item in React state
        for (let key in this.state) {
          // save to localStorage
          localStorage.setItem(key, JSON.stringify(this.state[key]));
        }
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
