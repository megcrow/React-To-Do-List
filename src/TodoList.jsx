import React from "react";
import TodoItems from "./TodoItems"
import "./TodoList.css";

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        }
        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.editItem = this.editItem.bind(this);
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

    addItem(e) {
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
        console.log(this.state.items);
        e.preventDefault();
    }

    editItem(e) {
            var editedItem = {
                text: "i have been edited",
                key: Date.now()
            };

            this.setState((prevState) => {
                return {
                    items: prevState.items.splice(0, 1, editedItem)
                };
            });
        // e.preventDefault();  
    }

    deleteItem(key) {
        var filteredItems =this.state.items.filter(function (item) {
            return (item.key !== key);
        });
        this.setState({
            items: filteredItems
        });
    }

    render() {
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
                <TodoItems entries={this.state.items}
                           delete={this.deleteItem}
                           edit={this.editItem}/>
            </div>
        );
    }
}

export default TodoList
