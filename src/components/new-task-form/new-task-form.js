import React from "react";
import "./new-task-form.css";

export default class NewTaskForm extends React.Component {
    render() {
        return <input className="todo-app__input new-task-form" 
            placeholder="What needs to be done?" 
            autoFocus 
            onChange={this.props.onChange}
            onKeyDown={this.props.onKeyDown}
            value={this.props.value}
        />;
    }
}

