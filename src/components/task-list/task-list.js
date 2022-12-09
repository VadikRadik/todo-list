import React from "react";
import Task from "../task";

import "./task-list.css"

const TaskList = ({tasks, onDelete, onToggleComplete, onEditTaskInput, onEditOn, onEditOff}) => {
    const taskItems = tasks.map(
      task => <Task 
        key={task.id} 
        task={task} 
        onDelete={() => onDelete(task.id)} 
        onToggleComplete={() => onToggleComplete(task.id)}
        onEditTaskInput={onEditTaskInput}
        onEditOn={() => onEditOn(task.id)}
        onEditOff={onEditOff}
      />
    );
    
    return (
      <ul className="task-list">
        { taskItems }
      </ul>
    );
}

export default TaskList;
