import React from "react";
import { formatDistanceToNow } from 'date-fns';

import "./task.css";

export default class Task extends React.Component {
    static defaultProps = {
      onDelete: () => {},
      onToggleComplete: () => {},
      onEditTaskInput: () => {},
      onEditOn: () => {},
      onEditOff: () => {},
    }
    
    render() {
      const {id, ...taskProps} = this.props.task;
  
      let taskClass = "task";
      let viewClass = "task__view";
      let descriptionClass = "task__description";
      let editingInput = null;

      if (taskProps.isCompleted) {
        descriptionClass = "task__description task__description--completed";
      } else if (taskProps.isEditing) {
        taskClass = "task--editing";
        editingInput = <input type="text" 
          className="todo-app__input task__edit" 
          onChange={(e) => this.props.onEditTaskInput(id,e)} 
          value={taskProps.description}
          onKeyDown={(e) => this.props.onEditOff(id,e)}
        />;
        viewClass = "task__view--editing";
      }
      
      return (
        <li className={taskClass}>
          <div className={viewClass}>
            <input className="todo-app__input task__toggle" type="checkbox" checked={taskProps.isCompleted} onChange={this.props.onToggleComplete}/>
            <label className="task__label" onClick={this.props.onToggleComplete}>
              <span className={descriptionClass}>{ taskProps.description }</span>
              <span className="task__created-ago">{formatDistanceToNow(new Date(taskProps.createdTs), { addSuffix: true })}</span>
            </label>
            <button className="task__icon task__icon-edit todo-app__button" onClick={this.props.onEditOn}></button>
            <button className="task__icon task__icon-destroy todo-app__button" onClick={this.props.onDelete}></button>
          </div>
          { editingInput }
        </li>
      );
    }
   
}
