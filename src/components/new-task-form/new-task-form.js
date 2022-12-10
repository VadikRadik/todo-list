import React from "react";
import PropTypes from "prop-types";
import "./new-task-form.css";

export default class NewTaskForm extends React.Component {
    static defaultProps = {
        onChange: () => {}, 
        onKeyDown: () => {},
    }

    static propTypes = {
        onChange: PropTypes.func,
        onKeyDown: PropTypes.func,
        value: PropTypes.string.isRequired,
    }

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

