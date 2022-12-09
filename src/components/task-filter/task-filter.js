import React from "react";

import "./task-filter.css";

const BUTTON_CLASS = "todo-app__button task-filter__button";
const BUTTON_SELECTED = "task-filter__button--selected";

export default class TaskFilter extends React.Component {

    static get STATE_ALL () {
        return 0;
    }

    static get STATE_ACTIVE () {
        return 1;
    }

    static get STATE_COMPLETED () {
        return 2;
    }

    static get STATES_TOTAL () {
        return 3;
    }

    render() {
        let filterState = this.props.filter;
        let buttonsClasses = new Array(TaskFilter.STATES_TOTAL).fill(BUTTON_CLASS);

        switch (filterState) {
            case TaskFilter.STATE_ALL:
                buttonsClasses[TaskFilter.STATE_ALL] += ` ${BUTTON_SELECTED}`;
                break;
            case TaskFilter.STATE_ACTIVE:
                buttonsClasses[TaskFilter.STATE_ACTIVE] += ` ${BUTTON_SELECTED}`;
                break;
            case TaskFilter.STATE_COMPLETED:
                buttonsClasses[TaskFilter.STATE_COMPLETED] += ` ${BUTTON_SELECTED}`;
                break;
            default:
                break;
        }

        return (
            <ul className="task-filter">
                <li className="task-filter__item">
                    <button className={buttonsClasses[TaskFilter.STATE_ALL]} 
                    onClick={() => this.props.onFilterSwitch(TaskFilter.STATE_ALL)}>All</button>
                </li>
                <li className="task-filter__item">
                    <button className={buttonsClasses[TaskFilter.STATE_ACTIVE]} 
                    onClick={() => this.props.onFilterSwitch(TaskFilter.STATE_ACTIVE)}>Active</button>
                </li>
                <li className="task-filter__item">
                    <button className={buttonsClasses[TaskFilter.STATE_COMPLETED]}
                    onClick={() => this.props.onFilterSwitch(TaskFilter.STATE_COMPLETED)}>Completed</button>
                </li>
            </ul>
        );
    }
}

