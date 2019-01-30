import React from "react";
import ReactDOM from "react-dom";

import TodoList from "./TodoList/TodoList";
import "./index.css";

ReactDOM.render(
    <div>
        <TodoList />
    </div>,
    document.querySelector("#container")
);
