import { render } from "@testing-library/react";
import React from "react";
import Task from "../task";

import "./task-list.css"

export default class TaskList extends React.Component {
  static defaultProps = {
    onDelete: () => {}, 
    onToggleComplete: () => {}, 
    onEditTaskInput: () => {}, 
    onEditOn: () => {}, 
    onEditOff: () => {}, 
  }

  render() {
    const {tasks, onDelete, onToggleComplete, onEditTaskInput, onEditOn, onEditOff} = this.props;
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
}

