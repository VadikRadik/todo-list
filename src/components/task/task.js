import React from "react";
import "./task.css";

const Task = ({task}) => {
    const {id, ...taskProps} = task;
  
    let taskClass = "task";
    let viewClass = "task__view";
    let descriptionClass = "task__description";
    let editingInput = null;

    if (taskProps.isCompleted) {
      //taskClass = "completed";
      descriptionClass = "task__description task__description--completed";
    } else if (taskProps.isEditing) {
      taskClass = "task--editing";
      editingInput = <input type="text" className="task__edit" value="Editing task" />;
      viewClass = "task__view--editing";
    }
    
    return (
      <li key={id} className={taskClass}>
        <div className={viewClass}>
          <input className="task__toggle" type="checkbox" />
          <label className="task__label">
            <span className={descriptionClass}>{ taskProps.description }</span>
            <span className="task__created-ago">created 17 seconds ago</span>
          </label>
          <button className="task__icon task__icon-edit"></button>
          <button className="task__icon task__icon-destroy"></button>
        </div>
        { editingInput }
      </li>
    );
}

export default Task;
