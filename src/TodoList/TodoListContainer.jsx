import { compose, withState, withHandlers } from 'recompose';

import TodoList from './TodoList';

const isNullOrWhiteSpace = (str) => (!str || str.length === 0 || /^\s*$/.test(str));

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
        editItem: ({setItemArray, itemArray}) => {
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
        }
    })
)

export default enhance(TodoList);
