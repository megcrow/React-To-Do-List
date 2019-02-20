import { compose, withState, withHandlers } from 'recompose';
import TodoList from './TodoList';



const enhance = compose(

    withState('itemArray', 'setItemArray', []),
    withHandlers({
        addItem: ({ setItemArray, itemArray }) => {
            return (e) => {
                e.preventDefault();
                if (e.target[0].value.length !== 0){
                    const {
                        value: text
                    } = e.target[0];
                    const newItem = {
                        text,
                        key: Date.now()
                    };
                    e.target.reset()
                    return setItemArray(itemArray.concat(newItem));}
            }
        },
        // editItem: ({}),
        // deleteItem:
    })
    // withProps {
    //     deleteItem: fn(),
    //     editItem: fn(),
    //     items: {key: Date.now(), text: ''}

    // },
    // withStateHandlers
)

export default enhance(TodoList);
