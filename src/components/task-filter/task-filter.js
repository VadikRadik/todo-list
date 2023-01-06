import React from 'react'

import './task-filter.css'

const BUTTON_CLASS = 'todo-app__button task-filter__button'
const BUTTON_SELECTED = 'task-filter__button--selected'

class TaskFilterStates {
  static get STATE_ALL() {
    return 0
  }
  static get STATE_ACTIVE() {
    return 1
  }
  static get STATE_COMPLETED() {
    return 2
  }
  static get STATES_TOTAL() {
    return 3
  }
}

const TaskFilter = (props) => {
  let filterState = props.filter
  let buttonsClasses = new Array(TaskFilterStates.STATES_TOTAL).fill(BUTTON_CLASS)

  switch (filterState) {
    case TaskFilterStates.STATE_ALL:
      buttonsClasses[TaskFilterStates.STATE_ALL] += ` ${BUTTON_SELECTED}`
      break
    case TaskFilterStates.STATE_ACTIVE:
      buttonsClasses[TaskFilterStates.STATE_ACTIVE] += ` ${BUTTON_SELECTED}`
      break
    case TaskFilterStates.STATE_COMPLETED:
      buttonsClasses[TaskFilterStates.STATE_COMPLETED] += ` ${BUTTON_SELECTED}`
      break
    default:
      break
  }

  return (
    <ul className="task-filter">
      <li className="task-filter__item">
        <button
          className={buttonsClasses[TaskFilterStates.STATE_ALL]}
          onClick={() => props.onFilterSwitch(TaskFilterStates.STATE_ALL)}
        >
          All
        </button>
      </li>
      <li className="task-filter__item">
        <button
          className={buttonsClasses[TaskFilterStates.STATE_ACTIVE]}
          onClick={() => props.onFilterSwitch(TaskFilterStates.STATE_ACTIVE)}
        >
          Active
        </button>
      </li>
      <li className="task-filter__item">
        <button
          className={buttonsClasses[TaskFilterStates.STATE_COMPLETED]}
          onClick={() => props.onFilterSwitch(TaskFilterStates.STATE_COMPLETED)}
        >
          Completed
        </button>
      </li>
    </ul>
  )
}

export { TaskFilter, TaskFilterStates }
