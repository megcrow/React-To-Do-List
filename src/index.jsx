import React from 'react';
import ReactDOM from 'react-dom';

import TodoListContainer from './TodoList/TodoListContainer';
import RandomDogContainer from './RandomDog/RandomDogContainter';
import './index.css';

ReactDOM.render(
    <div>
        <RandomDogContainer />
        <TodoListContainer />
    </div>,
    document.getElementById('container')
);
