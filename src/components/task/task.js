import React from "react";
import "./task.css";

const Task = ({task}) => {
    const {id, ...taskProps} = task;
  
    let styleClass = "";
    let editingInput = null;
    if (taskProps.isCompleted) {
      styleClass = "completed";
    } else if (taskProps.isEditing) {
      styleClass = "editing";
      editingInput = <input type="text" className="edit" value="Editing task" />;
    }
    
    return (
      <li key={id} className={styleClass}>
        <div className="view">
          <input className="toggle" type="checkbox" />
          <label>
            <span className="description">{ taskProps.description }</span>
            <span className="created">created 17 seconds ago</span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy"></button>
        </div>
        { editingInput }
      </li>
    );
}

export default Task;
