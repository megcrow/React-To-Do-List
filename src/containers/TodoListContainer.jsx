import { compose, lifecycle, withState, withHandlers } from 'recompose';

import TodoList from '../components/TodoList/TodoList';

const isNullOrWhiteSpace = (str) => (!str || str.length === 0 || /^\s*$/.test(str));

const saveStateToLocalStorage = (items) => {
    localStorage.setItem('items', JSON.stringify(items));
}

const enhance = compose(
    withState('itemArray', 'setItemArray', []),

    withHandlers({
        addItem: ({ setItemArray, itemArray }) => {
            return (e) => {
                e.preventDefault();
                const {
                    value: text
                } = e.target[0];
                if (!isNullOrWhiteSpace(text)){
                    const newItem = {
                        text,
                        key: Date.now()
                    };
                    e.target.reset();
                    return setItemArray(itemArray.concat(newItem));
                }
            }
        },

        deleteItem: ({ setItemArray, itemArray }) => {
            return(key) => {
               const filteredItems = itemArray.filter((item) => item.key !== key);
               return setItemArray(filteredItems);
            }
        },

        editItem: ({ setItemArray, itemArray }) => {
            return(e, key) => {
                    const editedItem = {
                        text: e.target.value,
                        key: Date.now()
                    };
                    if (isNullOrWhiteSpace(editedItem.text)) {
                        return;
                    }
                    const newItems = itemArray.reduce((arr, item) => {
                        if (item.key === key) {
                            arr.push(editedItem);
                        } else {
                            arr.push(item);
                        }
                        return arr;
                    }, []);
                    return setItemArray(newItems);
            }
        },

        hydrateStateWithLocalStorage: ({ setItemArray, itemArray }) => {
            return(e) =>{
                 if (localStorage.hasOwnProperty('items')) {
                // get the key's value from localStorage
                let items = localStorage.getItem('items');
                // parse the localStorage string and setState
                try {
                    items = JSON.parse(items);
                    return setItemArray(items);
                } catch (e) {
                    // handle empty string
                    return setItemArray(items);}
                }
            }
        }
    }),

    lifecycle({
        componentDidMount() {
            this.props.hydrateStateWithLocalStorage();
            // add event listener to save state to localStorage
            // when user leaves/refreshes the page
            window.addEventListener(
                'beforeunload',
                saveStateToLocalStorage(this.props.itemArray)
            );
        },

        componentDidUpdate() {
            window.removeEventListener(
                'beforeunload',
                saveStateToLocalStorage(this.props.itemArray)
            );
        },
    }),
)

export default enhance(TodoList);
