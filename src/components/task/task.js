import React from "react";
import { formatDistanceToNow } from 'date-fns';

import "./task.css";

export default class Task extends React.Component {
    constructor(props) {
      super(props);
      this.state = this.props.task;
    }
    
    render() {
      const {id, ...taskProps} = this.state;
  
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
        <li className={taskClass}>
          <div className={viewClass}>
            <input className="todo-app__input task__toggle" type="checkbox" checked={taskProps.isCompleted} onChange={this.onTaskClicked}/>
            <label className="task__label" onClick={this.onTaskClicked}>
              <span className={descriptionClass}>{ taskProps.description }</span>
              <span className="task__created-ago">{formatDistanceToNow(new Date(2014, 6, 2), { addSuffix: true })}</span>
            </label>
            <button className="task__icon task__icon-edit todo-app__button"></button>
            <button className="task__icon task__icon-destroy todo-app__button" onClick={this.props.onDelete}></button>
          </div>
          { editingInput }
        </li>
      );
    }

    onTaskClicked = () => {
      this.setState((state) => ({isCompleted: !state.isCompleted}));
    }
    
}
