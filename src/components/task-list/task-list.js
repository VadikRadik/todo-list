import React from 'react'
import PropTypes from 'prop-types'

import Task from '../task'

import './task-list.css'

export default class TaskList extends React.Component {
  static defaultProps = {
    onDelete: () => {},
    onToggleComplete: () => {},
    onEditTaskInput: () => {},
    onEditOn: () => {},
    onEditOff: () => {},
  }

  static propTypes = {
    onDelete: PropTypes.func,
    onToggleComplete: PropTypes.func,
    onEditTaskInput: PropTypes.func,
    onEditOn: PropTypes.func,
    onEditOff: PropTypes.func,
    tasks: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        isCompleted: PropTypes.bool.isRequired,
        isEditing: PropTypes.bool.isRequired,
        createdTs: PropTypes.number.isRequired,
      })
    ).isRequired,
  }

  render() {
    const { tasks, onDelete, onToggleComplete, onEditTaskInput, onEditOn, onEditOff } = this.props
    const taskItems = tasks.map((task) => (
      <Task
        key={task.id}
        task={task}
        onDelete={() => onDelete(task.id)}
        onToggleComplete={() => onToggleComplete(task.id)}
        onEditTaskInput={onEditTaskInput}
        onEditOn={() => onEditOn(task.id)}
        onEditOff={onEditOff}
      />
    ))

    return <ul className="task-list">{taskItems}</ul>
  }
}
