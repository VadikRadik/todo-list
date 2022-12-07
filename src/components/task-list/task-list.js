import React from "react";
import Task from "../task";

import "./task-list.css"

const TaskList = ({tasks}) => {
    const taskItems = tasks.map(task => <Task task={task} />);
    return (
      <ul className="task-list">
        { taskItems }
      </ul>
    );
}

export default TaskList;
