import React from "react";
import TaskFilter from "../task-filter"
import "./footer.css";

export default class Footer extends React.Component {
    render() {
        return (
            <footer className="footer">
                <span className="footer__todo-count">{this.props.activeCount} items left</span>
                <TaskFilter filter={this.props.filter} onFilterSwitch={this.props.onFilterSwitch}/>
                <button className="todo-app__button footer__clear-completed" onClick={this.props.onClearCompletedClicked}>Clear completed</button>
            </footer>
        );
    }
}

