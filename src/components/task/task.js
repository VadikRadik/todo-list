import React from "react";
import { formatDistanceToNow } from 'date-fns';

import "./task.css";

const Task = ({task}) => {
    const {id, ...taskProps} = task;
  
    let taskClass = "task";
    let viewClass = "task__view";
    let descriptionClass = "task__description";
    let editingInput = null;

    if (taskProps.isCompleted) {
      descriptionClass = "task__description task__description--completed";
    } else if (taskProps.isEditing) {
      taskClass = "task--editing";
      editingInput = <input type="text" className="todo-app__input task__edit" value="Editing task" />;
      viewClass = "task__view--editing";
    }
    
    return (
      <li key={id} className={taskClass}>
        <div className={viewClass}>
          <input className="todo-app__input task__toggle" type="checkbox" />
          <label className="task__label">
            <span className={descriptionClass}>{ taskProps.description }</span>
            <span className="task__created-ago">{formatDistanceToNow(new Date(2014, 6, 2), { addSuffix: true })}</span>
          </label>
          <button className="task__icon task__icon-edit todo-app__button"></button>
          <button className="task__icon task__icon-destroy todo-app__button"></button>
        </div>
        { editingInput }
      </li>
    );
}

export default Task;
