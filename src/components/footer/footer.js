import React from "react";
import TaskFilter from "../task-filter"
import PropTypes from "prop-types";
import "./footer.css";

export default class Footer extends React.Component {
    static defaultProps = {
        onFilterSwitch: () => {}, 
        onClearCompletedClicked: () => {},
        filter: TaskFilter.STATE_ALL,
    }

    static propTypes = {
        onFilterSwitch: PropTypes.func,
        onClearCompletedClicked: PropTypes.func,
        filter: PropTypes.oneOf([TaskFilter.STATE_ALL, TaskFilter.STATE_ACTIVE, TaskFilter.STATE_COMPLETED]),
        activeCount: PropTypes.number.isRequired,
    }

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

