import React from "react";

import "./task-filter.css";

const TaskFilter = () => {
    return (
        <ul className="task-filter">
            <li className="task-filter__item">
                <button className="todo-app__button task-filter__button task-filter__button--selected">All</button>
            </li>
            <li className="task-filter__item">
                <button className="todo-app__button task-filter__button">Active</button>
            </li>
            <li className="task-filter__item">
                <button className="todo-app__button task-filter__button">Completed</button>
            </li>
        </ul>
    );
}

export default TaskFilter;
