import React from 'react';
import ReactDOM from 'react-dom';

import TodoListContainer from './containers/TodoListContainer';
import RandomDogContainer from './containers/RandomDogContainter';
import './index.css';

ReactDOM.render(
    <div>
        <RandomDogContainer />
        <TodoListContainer />
    </div>,
    document.getElementById('container')
);
