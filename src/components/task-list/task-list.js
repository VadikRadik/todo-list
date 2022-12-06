import React from "react";
import Task from "../task";

const TaskList = ({tasks}) => {
    const taskItems = tasks.map(task => <Task task={task} />);
    return (
      <ul className="todo-list">
        { taskItems }
      </ul>
    );
}

export default TaskList;
