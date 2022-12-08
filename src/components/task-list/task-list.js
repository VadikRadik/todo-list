import React from "react";
import Task from "../task";

import "./task-list.css"

const TaskList = ({tasks, onDelete}) => {
    const taskItems = tasks.map(task => <Task key={task.id} task={task} onDelete={() => onDelete(task.id)} />);
    return (
      <ul className="task-list">
        { taskItems }
      </ul>
    );
}

export default TaskList;
